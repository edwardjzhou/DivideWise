  class User < ApplicationRecord
  
 # How to deal with capitalization in a username? 1. save it with caps to DB but model doesnt consider case different strings difeferent so no username AND USERNAME
 # 2. find by credentials has to find it lowercased
 

  attr_reader :password
  after_initialize :ensure_session_token


  # regex examples
  # ^[a-zA-Z] matches any string that begins with a letter
  # [^a-zA-Z] matches any string that contains a non-letter

  # ^ and $ are the start and end of line anchors, whereas \A and \Z are the start and end of string anchors.
  # \z anchors at the end of the string, 
  # \Z anchors at the end of the string or before the last newline, if the string ends with a newline. So, if the string ends with a newline, \Z anchors before that last newline and \z anchors after.
  validates :username, :password_digest, :session_token, :email, presence: true, allow_blank: false
  # validates :username, :email, uniqueness: true
  validates :username, :email, uniqueness: { case_sensitive: false }

  validates :username, format: { with: /\A[a-zA-Z0-9]+\z/, message: "must only be letters and numbers"}
  validates :email, format: { with: /\A.+@.+\z/, message: "must be of x@x format where x are anything" } 
  
  validates :password, length: { minimum: 8 }, allow_nil: true

    #User.first.id = 1
    #User.first.borrowings = [#<Bill id: 3, description: "anthony bourdain special", lender_id: 3, borrower_id: 1, amount: 1234, settled: true, created_at: "2020-01-13 22:01:11", updated_at: "2020-01-13 22:01:11">, #<Bill id: 5, description: "alacarte $7 duck box", lender_id: 4, borrower_id: 1, amount: 9900, settled: true, created_at: "2020-01-13 22:01:11", updated_at: "2020-01-13 22:01:11">, #<Bill id: 10, description: "descriplmao", lender_id: 60, borrower_id: 1, amount: 500, settled: false, created_at: "2020-02-12 22:30:37", updated_at: "2020-02-12 22:30:37">, #<Bill id: 11, description: "descriplmao", lender_id: 60, borrower_id: 1, amount: 500, settled: false, created_at: "2020-02-12 22:32:29", updated_at: "2020-02-12 22:32:29">, #<Bill id: 12, description: "descriplmao", lender_id: 60, borrower_id: 1, amount: 500, settled: false, created_at: "2020-02-12 22:33:01", updated_at: "2020-02-12 22:33:01">, #<Bill id: 13, description: "descriplmao", lender_id: 60, borrower_id: 1, amount: 500, settled: false, created_at: "2020-02-12 22:35:10", updated_at: "2020-02-12 22:35:10">]>
    #User.first.lenders = [#<User id: 4, username: "yin", email: "yin@yin.com", password_digest: "$2a$12$DFtp4yW8vCStaE728Fjz8uuI4mRLASJAqjglPdmUkI9...", session_token: "61hCpcX7BNKzUiRUzlBEjg", created_at: "2020-01-13 22:01:10", updated_at: "2020-01-13 22:01:10">, #<User id: 60, username: "adsfaoeri", email: "gggggg@gmail.comdsfaasdfasdf", password_digest: "$2a$12$MYMJ/T1w0dd0aO7XiFRZE.EiExP9g.YfBozMdi8yfwC...", session_token: "SPO0VUvPF52svHwX2fAPJw", created_at: "2020-02-12 21:54:56", updated_at: "2020-02-12 21:54:56">, #<User id: 60, username: "adsfaoeri", email: "gggggg@gmail.comdsfaasdfasdf", password_digest: "$2a$12$MYMJ/T1w0dd0aO7XiFRZE.EiExP9g.YfBozMdi8yfwC...", session_token: "SPO0VUvPF52svHwX2fAPJw", created_at: "2020-02-12 21:54:56", updated_at: "2020-02-12 21:54:56">, #<User id: 60, username: "adsfaoeri", email: "gggggg@gmail.comdsfaasdfasdf", password_digest: "$2a$12$MYMJ/T1w0dd0aO7XiFRZE.EiExP9g.YfBozMdi8yfwC...", session_token: "SPO0VUvPF52svHwX2fAPJw", created_at: "2020-02-12 21:54:56", updated_at: "2020-02-12 21:54:56">, #<User id: 60, username: "adsfaoeri", email: "gggggg@gmail.comdsfaasdfasdf", password_digest: "$2a$12$MYMJ/T1w0dd0aO7XiFRZE.EiExP9g.YfBozMdi8yfwC...", session_token: "SPO0VUvPF52svHwX2fAPJw", created_at: "2020-02-12 21:54:56", updated_at: "2020-02-12 21:54:56">, #<User id: 3, username: "edward", email: "edward@edward.com", password_digest: "$2a$12$at6DIpL8uAeYxXTr4HZ5O.Xsucm/OA57i3HWQGBDxDV...", session_token: "cPkDKHGL7uUjWtZEg41mdQ", created_at: "2020-01-13 22:01:10", updated_at: "2020-05-10 22:00:25">]>
    # User.first.lenders.pluck(:username) => [4, 60, 60, 60, 60, 3]
  has_many :borrowings,
  foreign_key: :borrower_id,
  class_name: "Bill"

  #ITS A USER:  select * from bills join on basis of borrower_id = user.id
  has_many :lendings,
  foreign_key: :lender_id,
  class_name: "Bill"

# SELECT  "users".* FROM "users" INNER JOIN "bills" ON "users"."id" = "bills"."lender_id" WHERE "bills"."borrower_id" = $1 LIMIT $2  [["borrower_id", 1]
  has_many :lenders, #users  
  through: :borrowings, #bills where i was the borrower
  source: :lender #users that were the lender on those bills

  has_many :borrowers,
  through: :lendings,
  source: :borrower


  #should've done two entries/friendship rather than one; it wouldve been much easier/faster

  has_many :friendships_one,  #friendships
  foreign_key: :user_one_id,
  class_name: 'Friendship'

  has_many :friendships_two,
  foreign_key: :user_two_id,
  class_name: 'Friendship'

  #PROBLEM AREA
  # SELECT  "users".* FROM "users" INNER JOIN "friendships" ON "users"."id" = "friendships"."user_one_id" WHERE "friendships"."user_two_id" = $1 LIMIT $2
  has_many :friends,
  through: :friendships_two,
  source: :user_one
  # has_many :friends, #users
  # through: :friendships_one, #friendship
  # source: :user_one

  # has_many :friends_two,
  # through: :friendships_two,
  # source: :user_two

  has_many :payments,
  foreign_key: :payer_id,
  class_name: 'Payment'

# SELECT DISTINCT Country FROM Customers
        
    # def findFriendIDs(user)
    #   answer = []
    #   temp1 = user.friendships_one 
    #   temp1.each {|friendship| answer.push(friendship.user_two_id)}
    #   temp2 = user.friendships_two
    #   temp.each do 

    # end


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
    # @password = password IS THIS NEEDED?
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
