class Api::PaymentsController < ApplicationController
    before_action :require_login

    def create
        @payment = Payment.new(payment_params)

        # if current_user.id.to_s != @payment.payer_id.to_s and current_user.id.to_s != @payment.b_id.to_s
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
        # @payments = Payment.all.where("payer_id = #{current_user.id.to_s} or bill_id in cu")
        # p params[:bill_id]
         billids=[]
         bills = current_user.lendings.to_a
         bills.each do |bill|
            billids.push(bill.id)   
         end
         @payments=[]
         billids.each do |billid|
            payment = Payment.find_by(bill_id:billid)
            @payments.push(payment) if payment != nil
         end
        render "api/payments/index"
        
    end
    
    private
    def payment_params
        params.require(:payment).permit!
    end    
end
