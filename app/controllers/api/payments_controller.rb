class Api::PaymentsController < ApplicationController
    before_action :require_login

    def create
        @payment = Payment.new(payment_params)

        # if current_user.id.to_s != @payment.payer_id.to_s and current_user.id.to_s != @payment._id.to_s
        #     render json: ["not a bill you're involved in"]
        # elsif @bill.save
        #     render "api/bills/show"
        # else
        #     render json: @bill.errors.full_messages, status:422
        # end

        if @payment.save
            render "api/payments/show"
        else
            render json: @payment.errors.full_messages, status:422
        end
    end

    def index
        @payments = Payment.all.where("payer_id = #{current_user.id.to_s} OR bill_id = #{current_user.lendings.id.to_s}" )
        render "api/payments/index"
    end
    
    private
    def payment_params
        params.require(:payment).permit!
    end    
end
