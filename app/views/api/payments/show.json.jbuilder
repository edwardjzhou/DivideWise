json.extract! @payment, :id, :payer_id, :bill_id, :amount, :created_at
json.lender @payment.bill.lender.username