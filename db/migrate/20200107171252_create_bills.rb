class CreateBills < ActiveRecord::Migration[5.2]
  def change
    create_table :bills do |t|
      t.string :description, null: false
      t.integer :lender_id, null: false
      t.integer :borrower_id, null: false
      t.integer :amount, null: false
      t.boolean :settled, null: false

      t.timestamps
    end
    add_index :bills, :lender_id
    add_index :bills, :borrower_id

  end
end
