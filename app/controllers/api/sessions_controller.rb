class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username], 
      params[:user][:password])
    if @user
      login(@user)
      render "api/users/show"
    else
      render json: ["Whoops! We couldn’t find an account for that email address and password. Maybe you’ve forgotten your password?
"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      # render json: ["You destroyed your session!"]
      render "api/users/show"
      # render "static_pages/root.html.erb"
    else
      render json: ["Nobody signed in"], status: 404
    end
  end
end
