class Friendship < ApplicationRecord
    #https://stackoverflow.com/questions/11400160/validation-condition-on-friendships-in-rails-3
    # validates :user_one_id, :user_two_id, presence: true #, unless: Friendship.friendship_exists?(:user_one_id, :user_two_id)
    

    validates :user_one_id, numericality: { less_than: :user_two_id } # User_one has to be smaller than User_two
    validates :user_one_id, :user_two_id, presence: true, allow_blank: false 
    validates :user_one_id, :uniqueness => { :scope => :user_two_id } #Is there already a friendship with same users?
    # validate :users_exist?#, :on => :save #Do these 2 users exist?

    belongs_to :user_one,
    foreign_key: :user_one_id,
    class_name: 'User'

    belongs_to :user_two,
    foreign_key: :user_two_id,
    class_name: 'User'
# asdf = Friendship.new(user_one_id:1, user_two_id:32948324)
# asdf.errors
#<ActiveModel::Errors:0x00007fbfb99c9b88 @base=#<Friendship id: nil, user_one_id: 1, user_two_id: 32948324, created_at: nil, updated_at: nil>, @messages={:user_one_id=>["must be greater than 32948324"]}, @details={:user_one_id=>[{:error=>:greater_than, :value=>1, :count=>32948324}]}>



    # def users_exist?
        # errors.add(:hey,"The user you're adding isn't a user") unless User.exists?(self.user_one_id) and User.exists?(self.user_two_id)
    # end
    
    # validates :friend, :presence => true, :unless => :friend_is_self
    # validates [:user_one_id, :user_two_id], uniqueness: { scope: [:user_two_id, :user_one_id],
    # message: "pair should be unique since its a symmetrical relationship" }


    # def self.friendship_exists?(user1, user2)
    #     if user1.id == user2.id
    #         return false
    #     end
    #     if user1.id > user2.id
    #         user1, user2 = user2, user1 
    #     end
        
    #     Friendship.where("(user_one_id = ? AND user_two_id = ?)", user1.id, user2.id).size > 0
    # end
end