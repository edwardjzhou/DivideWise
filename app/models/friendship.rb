class Friendship < ApplicationRecord
    #https://stackoverflow.com/questions/11400160/validation-condition-on-friendships-in-rails-3
    validates :user_one_id, :user_two_id, presence: true
    # validates :friend, :presence => true, :unless => :friend_is_self
    # validates [:user_one_id, :user_two_id], uniqueness: { scope: [:user_two_id, :user_one_id],
    # message: "pair should be unique since its a symmetrical relationship" }

    # def self.friendship_exists?(user1, user2)
    #     Friendship.where("(user_one_id = ? AND user_two_id = ?) OR (user_id = ? AND friend_id = ?)", user1.id, user2.id, user2.id, user1.id).size > 0
    # end
end