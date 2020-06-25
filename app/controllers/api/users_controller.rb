class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save 
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status:422
        end
    end
    #  $.ajax({
    #         method: 'POST',
    #         url: '/api/user',
    #         data: {user: {username: 'wqerqwder', password: 'asdfasdf', email: 'asdfasddfasd3f' }}
    #     })

    # curl - v - H "Accept: appli"Content - type: application / json" -X POST -d ' {"user":{"username":"edward","password":"password"}}'  http://localhost:3000/api/session -b name=var


    def index
        @users = User.all
        render "api/users/index"
    end


    def googleauth
        require 'curb'

        id_token = auth_params[:id_token]
        email = auth_params[:email]

        http = Curl.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{CGI.escape(id_token)}")
        parsed = JSON.parse(http.body_str)
        dividewiseGoogleClientKey = "23767328561-ndo3b9lpk03lr9kfind7ur4srslp3qrr.apps.googleusercontent.com"
        if (Time.now.utc.to_i >= parsed["iat"].to_i and Time.now.utc.to_i < parsed["exp"].to_i and parsed["email"] == email and 
            parsed["iss"] == "accounts.google.com" and parsed["aud"] == dividewiseGoogleClientKey) 
            
            @user = User.where("LOWER(username) = LOWER(?)", email).first
            if @user
                @user.password=(id_token)
                login(@user) 
                render "api/users/show"
            else
                @user = User.new(username: email, password: id_token, email:email)
                if @user.save 
                    login(@user)
                    render "api/users/show"
                else
                    render json: @user.errors.full_messages, status:422
                end
            end

        else 
            render json: ['thats not a google account'], status: 402 #payment required
        end
    end


    def info
        @users = User.where(updated_at: (Time.now.midnight - 1.day)..Time.now.midnight).order(updated_at: :desc).pluck(:updated_at, :username)
        render json: @users
    end        
    # http://localhost:3000/api/info



    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :id_token)
        # params.require(:user).permit!
    end

    def auth_params
        params.require(:user).permit(:id_token, :email)
    end

end

