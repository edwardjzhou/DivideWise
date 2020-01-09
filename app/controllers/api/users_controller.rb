class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            p 'good'
            login(@user)
            render "api/users/show"
        else
            p 'bad'
            render json: @user.errors.full_messages, status:422
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :name, :password, :password_digest, :id)
    end
end
