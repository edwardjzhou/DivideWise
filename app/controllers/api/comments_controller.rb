class Api::CommentsController < ApplicationController
    before_action :require_login

    def create 
    end

    def destroy
    end

    def comment_params 
        params.require(:comment).permit!
    end
end
