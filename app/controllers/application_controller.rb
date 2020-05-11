# session lasts for as long as the browser is open.. so as long as the sesssion persists the same user-specific controller object is held in memory? PROB NO
# By default rails uses cookies to store the session data. All data is stored in the client, not on the server.
# the SERVER decrypts/encryhpts session data on every request
#  I was told not to store random data on the session object
# current_user is definitely an instance method for applicaitoncontroller. applicationcontroller is inherited by other controllers?  YES
# so a instance variable defined in ANY method here is also an instance variable for any controller ?  probably yes
# still unsure open q: 1 process for the entire rails server ? multithreading YES but is it 1 thread/REQUEST? heap memory shared for 1 PROCESS? so
# class VARIABLES ALWAYS SHARED? PROBABLY .  are all class definitions read into memory Only ONCE? or once per thread

class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  skip_before_action :verify_authenticity_token

  #credits: https://stackoverflow.com/questions/22752777/how-do-you-manually-execute-sql-commands-in-ruby-on-rails-using-nuodb
  def execute_statement(sql)
    # results = ActiveRecord::Base.connection.execute(sql)
        asdf = ActiveRecord::Base.connection.execute("SELECT * FROM friendships JOIN users ON users.id=CAST(friendships.user_one_id AS int)").values

    # asdf = ActiveRecord::Base.connection.execute("SELECT * FROM users JOIN friendships ON friendships.user_one_id=users.id WHERE users.id=2").values
    p asdf
    return asdf
    # if results.present?
    #   return results.values
    # else
    #   return nil
    # end
  end

  def current_user
    #every controller class inherits app controller and thus this method
    #before any controller action i use require_login which calls this method current_user setting a instance variable of @current_user for that controller class object
    # so if session destroy ...
    # but each controller object only lives for 1 http request so nobody can abuse this instance variable of @current_user right
    @current_user ||= User.find_by_session_token(session[:session_token])
    # current_user ||= User.find_by_session_token(session[:session_token])

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
      # redirect_to(request.env[&quot;HTTP_REFERER&quot;])
    end
  end
  
end
