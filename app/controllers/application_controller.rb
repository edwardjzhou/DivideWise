class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  skip_before_action :verify_authenticity_token

  # https://stackoverflow.com/questions/22752777/how-do-you-manually-execute-sql-commands-in-ruby-on-rails-using-nuodb
  def execute_statement(sql)
    results = ActiveRecord::Base.connection.execute(sql)
    # results = ActiveRecord::Base.connection.execute("SELECT * FROM friendships JOIN users ON users.id=CAST(friendships.user_one_id AS int)").values

    if results.present?
      return results.values
    else
      return nil
    end
  end

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
    @current_user.reset_session_token! #reset_Session_token resets the session token and puts it in the db but we dont have it anymore so current_user should return a niled @current_user for logged_in? and require_login
    @current_user = nil 
  end

  def require_login
    if !current_user
      render json: 'YOU NEED TO LOGIN FIRST'
      # redirect_to(request.env[&quot;HTTP_REFERER&quot;])
    end
  end
  
end
