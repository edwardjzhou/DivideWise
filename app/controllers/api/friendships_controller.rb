class Api::FriendshipsController < ApplicationController
    before_action :require_login
    
    def create 
        @friendship = Friendship.new(friendship_params)
        if @friendship.user_one_id == @friendship.user_two_id && (current_user.id == @friendship.user_one_id || current_user.id == @friendship.user_two_id)
            render json: ["cant be own friend"]
        elsif @friendship.user_one_id > @friendship.user_two_id && (current_user.id == @friendship.user_one_id || current_user.id == @friendship.user_two_id)
            @friendship.user_one_id, @friendship.user_two_id = 
            @friendship.user_two_id, @friendship.user_one_id
        else
            render json: ["friendship failed because you're trying to make someone who isn't you friends with someone who isn't you"]
        end

        #check if it already exists? nah db validations

        if @friendship.save
            render "api/friendships/show"
        else
            render json: @friendship.errors.full_messages, status:422
        end

    end
        
    def destroy
        @friendship = Friendship.find[:id]
        if (current_user.id == @friendship.user_one_id || current_user.id == @friendship.user_two_id)
            @friendship.destroy!
            render json: ["destroyed friendship betwixt #{@friendship.user_one_id} and #{@friendship.user_two_id}"]
        else
            render json: ["destroy failure"]
        end
        # redirect_to "api/friendships/index"
    end

    def index
        @friendships = Friendship.where("user_one_id = ? OR user_two_id = ?", current_user.id.to_s, current_user.id.to_s)
        render "api/friendships/index"
    end

    private
    def friendship_params
        params.require(:friendship).permit!
    end
end

# $.ajax({
#         method: 'POST',
#         url: '/api/friendships',
#         data: {friendship: {user_one_id: 1, user_two_id: 2}}
#     })