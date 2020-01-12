class Api::PaymentsController < ApplicationController
    before_action :require_login

    def create
    end

    def index
    end
    
    def payment_params
        params.require(:payment).permit!
    end    
end
