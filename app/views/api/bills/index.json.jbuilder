#json.array! (@bills) do |bill|
@bills.each do |bill|
    json.set! bill.id do
        json.extract! bill, :lender_id, :borrower_id, :amount, :settled, :created_at, :id
        json.lender bill.lender.username
        json.borrower bill.borrower.username
        # json.payments bill.payments
    end
end

