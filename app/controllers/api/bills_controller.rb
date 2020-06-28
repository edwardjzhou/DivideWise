
# you want the whole record/row to be invalid so add error to :base
# class Person < ApplicationRecord
#   def a_method_used_for_validation_purposes
#     errors[:base] << "This person is invalid because ..."
#   end
# end

#else if you want an atribute to be invalid

# class Person < ApplicationRecord
#   def a_method_used_for_validation_purposes
#     errors.add(:name, "cannot contain the characters !@#%*()_-+=")
#   end
# end
 
# person = Person.create(name: "!@#")
 
# person.errors[:name]
#  # => ["cannot contain the characters !@#%*()_-+="]
 
# person.errors.full_messages
#  # => ["Name cannot contain the characters !@#%*()_-+="]

class Api::BillsController < ApplicationController
    before_action :require_login # THIS RUNS inherited current_user setting a @current_user

# <User id: 1, username: "demousername", email: "demo@demo.com", 
# password_digest: "$2a$12$x/n3W7Z6DQcsgr2C9M6EoOwZEQmNUZIH79ClF85aiYR...", 
# session_token: "kbZnB73J5BPPWcxr2TjsdA", created_at: "2020-05-11 10:17:45", 
# updated_at: "2020-05-11 10:17:45">

# dividewise_development=# \d users
#                                            Table "public.users"
#      Column      |            Type             | Collation | Nullable |              Default              
# -----------------+-----------------------------+-----------+----------+-----------------------------------
#  id              | bigint                      |           | not null | nextval('users_id_seq'::regclass)
#  username        | character varying           |           | not null | 
#  email           | character varying           |           | not null | 
#  password_digest | character varying           |           | not null | 
#  session_token   | character varying           |           | not null | 
#  created_at      | timestamp without time zone |           | not null | 
#  updated_at      | timestamp without time zone |           | not null | 
# Indexes:
#     "users_pkey" PRIMARY KEY, btree (id)
#     "index_users_on_email" UNIQUE, btree (email)
#     "index_users_on_session_token" UNIQUE, btree (session_token)
#     "index_users_on_username" UNIQUE, btree (username)

# dividewise_development=# \d friendships
#                                          Table "public.friendships"
#    Column    |            Type             | Collation | Nullable |                 Default                 
# -------------+-----------------------------+-----------+----------+-----------------------------------------
#  id          | bigint                      |           | not null | nextval('friendships_id_seq'::regclass)
#  user_one_id | integer                     |           | not null | 
#  user_two_id | integer                     |           | not null | 
#  created_at  | timestamp without time zone |           | not null | 
#  updated_at  | timestamp without time zone |           | not null | 
# Indexes:
#     "friendships_pkey" PRIMARY KEY, btree (id)
#     "index_friendships_on_user_one_id_and_user_two_id" UNIQUE, btree (user_one_id, user_two_id)



# %7B%22val%22%3A%201%7D   IS {"val": 1} in url querystring
    def friendshipExist?(user_one_id, user_two_id)
        ActiveRecord::Base.connection.execute("SELECT COUNT(1) FROM friendships WHERE user_one_id = #{user_one_id} AND user_two_id = #{user_two_id}").values
    end

    def create
        @bill = Bill.new(bill_params)
        if !Friendship.where("user_one_id = ? OR user_two_id = ?", @bill.lender_id.to_s, @bill.lender_id.to_s)
            .where("user_one_id = ? OR user_two_id = ?", @bill.borrower_id.to_s, @bill.borrower_id.to_s)
            render json: ["become friends first before creating a bill with others"]
        elsif current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def index  
        #  render json: execute_statement(`SELECT  "users".* FROM "users" INNER JOIN "bills" ON "users"."id" = "bills"."lender_id" WHERE "bills"."borrower_id" = $1 LIMIT $2`)
        # p execute_statement(`Select * From users Where users.id=1`)
        #  render json: execute_statement(`SELECT * FROM users`)
        
        # order of checking is model validations
        # THEN db validations
        #failure on DB validation should be a full blown error message 
        #ERROR:  duplicate key value violates unique constraint "index_friendships_on_user_one_id_and_user_two_id"
        #... must exist means an association ive written in models requires that foreign key to be there

        # answer = Friendship.create(user_one_id:5,user_two_id:2)
        # render json: [answer.errors, answer.errors.full_messages]

        # OLD + CORRECT: 

        @bills = Bill.all.where("lender_id = #{current_user.id.to_s} OR borrower_id = #{current_user.id.to_s}" )
        render "api/bills/index"

        # render json: params[`noob`
  

        # render "api/bills/show"
        # render json: [params, current_user, session]
        # render json: [@current_user]
        # render json: current_user
        
        #testing for:
        #yes params can take in a query string
        #yes you can call model classes obviously
        #yes puts show up in rails server
        #yes session is the object thing with id 

        #http://localhost:3000/api/bills?asdf=32
        #{"asdf":"32","format":"json","controller":"api/bills","action":"index"}
        # puts 'SADJFKUYDSFDSF'
        # render json: Bill.involved
        # render "api/bills/index"


        #testing

        # render json: params # {"format":"json","controller":"api/bills","action":"index"}

        # url    = 'http://www.foo.com?id=4&empid=6'
        # uri    = URI.parse(url)
        # params = CGI.parse(uri.query)
        # # params is now {"id"=>["4"], "empid"=>["6"]}

        # id     = params['id'].first
        # render json: [url, uri, params,id] #["http://www.foo.com?id=4\u0026empid=6","http://www.foo.com?id=4\u0026empid=6",{"id":["4"],"empid":["6"]},"4"]
        
        # render "api/bills/index"
        #[{"id":1,"description":"good mongkok",
        # "lender_id":1,"borrower_id":2,"amount":1000,
        # "settled":true,"created_at":"2020-01-10T21:39:15.985Z",
        # "updated_at":"2020-01-10T21:39:15.985Z"},
        # {"id":2,"description":"beer","lender_id":1,"borrower_id":2,
        # "amount":800,"settled":true,"created_at":"2020-01-10T21:39:15.990Z",
        # "updated_at":"2020-01-10T21:39:15.990Z"}]
    end

    def show
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def update
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.update(bill_params)
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status: 422
        end
    end

    def destroy
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.payments != []
            render json: ["cant delete a bill with payments already made to it-- payments must be atomic"]
        else
            @bill.destroy!
            render json: ["Destroyed bill #{@bill.id} about #{@bill.description}"]
        end
    end
    
    private
    def bill_params
        # params.require(:bill).permit(:description, :lender_id, :borrower_id, :amount, :settled)
        params.require(:bill).permit!
    end
end


# $.ajax({
#         method: 'POST',
#         url: '/api/bills',
#         data: {bill: {description: 'wqerqdwder', lender_id: 1, borrower_id: 2,amount: 2, settled: false }}
#     })

# $.ajax({
#         method: 'POST',
#         url: '/api/bills',
#         data: {bill: {user_one_id: 1, user_two_id: 2}}
#     })