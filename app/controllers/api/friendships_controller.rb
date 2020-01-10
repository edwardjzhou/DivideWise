class Api::FriendshipsController < ApplicationController

    def create 
        @friendship = Friendship.new(friendship_params)
        if @friendship.user_one_id == @friendship.user_two_id
            render json: "cant be own friend"
        elsif @friendship.user_one_id > @friendship.user_two_id
            @friendship.user_one_id, @friendship.user_two_id = 
            @friendship.user_two_id, @friendship.user_one_id
        end

        if @friendship.save
            render "api/friendships/show"
        else
            render json: @friendship.errors.full_messages, status:422
        end

    end
        
    def destroy
    end

    def index
    end

    private
    def friendship_params
        params.require(:friendship).permit!
    end
end
