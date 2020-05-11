  class User < ApplicationRecord
  
  attr_reader :password
  after_initialize :ensure_session_token

  validates :username, :password_digest, :session_token, :email, presence: true, allow_blank: false
  validates :username, :email, uniqueness: { case_sensitive: false }
  validates :username, format: { with: /\A[a-zA-Z0-9]+\z/, message: "must only be letters and numbers"}
  validates :email, format: { with: /\A.+@.+\z/, message: "must be of x@x format where x are anything" } 
  validates :password, length: { minimum: 8 }, allow_nil: true


  has_many :borrowings,
  foreign_key: :borrower_id,
  class_name: "Bill"

  has_many :lendings,
  foreign_key: :lender_id,
  class_name: "Bill"

  has_many :lenders,
  through: :borrowings,
  source: :lender 

  has_many :borrowers,
  through: :lendings,
  source: :borrower


  #Friend assocs: should've done two entries/friendship rather than one; it wouldve been much easier/faster
  has_many :friendships_one,  
  foreign_key: :user_one_id,
  class_name: 'Friendship'

  has_many :friendships_two,
  foreign_key: :user_two_id,
  class_name: 'Friendship'

  has_many :friends_one, 
  through: :friendships_one, 
  source: :user_one

  has_many :friends_two,
  through: :friendships_two,
  source: :user_two
  #end friends assocs

  has_many :payments,
  foreign_key: :payer_id,
  class_name: 'Payment'

# SELECT DISTINCT Country FROM Customers
        
    def self.findFriendUserIDs(user)
      user.friendships_one.pluck('user_two_id') + user.friendships_two.pluck('user_one_id')
    end


  def self.find_by_credentials(username, password)
    # user = User.find_by(username: username)
    user = User.where("LOWER(username) = LOWER(?)", username).first
    if user and user.is_valid_password?(password)
      return user
    else
      return nil
    end
  end

  def password=(password)
    # puts caller[0] activemodel magic 
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
