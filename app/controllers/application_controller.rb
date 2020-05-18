class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in? # these are inherited by all controllers anyways. we only need this line so views can use these methods
  skip_before_action :verify_authenticity_token

  # https://stackoverflow.com/questions/22752777/how-do-you-manually-execute-sql-commands-in-ruby-on-rails-using-nuodb
  def execute_statement(sql)
    results = ActiveRecord::Base.connection.execute(sql)
    # results = ActiveRecord::Base.connection.execute("SELECT * FROM friendships JOIN users ON users.id=CAST(friendships.user_one_id AS int)").values
    # ActiveRecord::Base.connection.execute("SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS").values
    #ActiveRecord::Base.connection.exec_query('...').rows
    if results.present?
      # return results.values
      return results
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
    current_user.reset_session_token!
    @current_user = nil 
  end

  def require_login
    if !current_user
      render json: 'YOU NEED TO LOGIN FIRST'
      # redirect_to(request.env[&quot;HTTP_REFERER&quot;])
      # redirect_to new_session_url
    end
  end
  
end
