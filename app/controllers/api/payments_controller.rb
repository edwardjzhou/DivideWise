class Api::PaymentsController < ApplicationController
    before_action :require_login

    def create
        @payment = Payment.new(payment_params)
        if @payment.save
            render "api/bills/show"
        else
            render json: @payment.errors.full_messages, status:422
        end
    end

    def index
        @payments = Payment.all
    end
    
    private
    def payment_params
        params.require(:payment).permit!
    end    
end
