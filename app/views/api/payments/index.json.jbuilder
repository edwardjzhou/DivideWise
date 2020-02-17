#json.array! (@bills) do |bill|
@payments.each do |payment|
    json.set! payment.id do
        json.extract! payment, :payer_id, :bill_id, :amount, :created_at, :id
        json.lender payment.bill.lender.username
        json.borrower payment.bill.borrower.username
        json.borrower_id payment.bill.borrower.id
    end
end

