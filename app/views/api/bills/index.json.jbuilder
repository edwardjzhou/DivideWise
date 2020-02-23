@bills.each do |bill|
    json.set! bill.id do
        json.extract! bill, :lender_id, :borrower_id, :amount, :settled, :created_at, :id, :description
        json.lender bill.lender.username
        json.borrower bill.borrower.username
        json.payments bill.payments.each do |payment|
            json.set! payment.id do
                json.extract! payment, :payer_id, :bill_id, :amount, :created_at, :updated_at
            end
        end
    end
end

