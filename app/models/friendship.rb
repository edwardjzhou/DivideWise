class Friendship < ApplicationRecord
    #https://stackoverflow.com/questions/11400160/validation-condition-on-friendships-in-rails-3
    validates :user_one_id, :user_two_id, presence: true #, unless: Friendship.friendship_exists?(:user_one_id, :user_two_id)
    
    belongs_to :user_one,
    foreign_key: :user_one_id,
    class_name: 'User'

    belongs_to :user_two,
    foreign_key: :user_two_id,
    class_name: 'User'
    
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