# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_11_061017) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bills", force: :cascade do |t|
    t.string "description", null: false
    t.integer "lender_id", null: false
    t.integer "borrower_id", null: false
    t.integer "amount", null: false
    t.boolean "settled", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["borrower_id"], name: "index_bills_on_borrower_id"
    t.index ["lender_id"], name: "index_bills_on_lender_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "bill_id", null: false
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bill_id"], name: "index_comments_on_bill_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "user_one_id", null: false
    t.integer "user_two_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_one_id", "user_two_id"], name: "index_friendships_on_user_one_id_and_user_two_id", unique: true
  end

  create_table "payments", force: :cascade do |t|
    t.integer "payer_id", null: false
    t.integer "bill_id", null: false
    t.integer "amount", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bill_id"], name: "index_payments_on_bill_id"
    t.index ["payer_id"], name: "index_payments_on_payer_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
