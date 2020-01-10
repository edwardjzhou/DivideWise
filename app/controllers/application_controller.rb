class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  skip_before_action :verify_authenticity_token


  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout
    session[:session_token] = nil
  end

  def require_login
    if !current_user
      render json: 'YOU NEED TO LOGIN FIRST'
    end
  end
  
end
