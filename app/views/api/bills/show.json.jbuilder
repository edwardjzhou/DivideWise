json.extract! @bill, :id, :lender_id, :borrower_id, :amount, :settled, :created_at, :id
json.lender @bill.lender.username
json.borrower @bill.borrower.username