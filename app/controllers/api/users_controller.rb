class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save #the second you tryt to save model validations are run
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status:422
        end
    end

    # before_action :require_login
    # // fetchUsers() in users API util uses this
    def index
        require 'open-uri'
        # url='http://www.google.com/'
        url= "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2MGE3ZThlODM0MWVkNzUyZjEyYjE4NmZhMTI5NzMxZmUwYjA0YzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjM3NjczMjg1NjEtbmRvM2I5bHBrMDNscjlrZmluZDd1cjRzcnNscDNxcnIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMzc2NzMyODU2MS1uZG8zYjlscGswM2xyOWtmaW5kN3VyNHNyc2xwM3Fyci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMDI5Mjg3MzMzMjc3NDE4Njc4OCIsImVtYWlsIjoiZWR3YXJkanpob3VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJKenlhSmdjOEgzRlAyWTBadDlMazV3IiwibmFtZSI6IkVkd2FyZCBaaG91IiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tT1ljYzE5QW8xaVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVja3pxYmpwWmJvMTVzbVVNNGdMdmxmTUZyOHp4QS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiRWR3YXJkIiwiZmFtaWx5X25hbWUiOiJaaG91IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTAzNTIyNDcsImV4cCI6MTU5MDM1NTg0NywianRpIjoiYmI0YjljZGNkMjI4YWZiZjVhODNmNjk2YzNlYTRhMzEwM2FiYzYxNyJ9.Z6bgc1oZ4DsKbqloX4trflaDtu1T06K-59SzzUKsCRPrJc_a-wVr_dWLO_4hLESwxWGYke1rG8zepAxEEDmh0CSktHwMI4ODrAjXHBGpMyqs0cZLHFYQo490cTwUvfRt5JeTkHq8xEZkHxdX2hJd6et0wKIaMYo43jdidhu-deEriVZDm7iVyfsJlnWddVkR6XMWgyrOmo3hCrrkGttdYyS5Nw_1x1SLDuyijsA3A9v0Q72smgNMIyduKRjbnbEiYsHfajxWdADipsagnfPKDbbKxWMu-iuXF1EeAqRyEZAKb8VSLiHk0to1xs2z96WJIuar_nwBMXLGFVzZ2SXyCA"
        # url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2MGE3ZThlODM0MWVkNzUyZjEyYjE4NmZhMTI5NzMxZmUwYjA0YzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjM3NjczMjg1NjEtbmRvM2I5bHBrMDNscjlrZmluZDd1cjRzcnNscDNxcnIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMzc2NzMyODU2MS1uZG8zYjlscGswM2xyOWtmaW5kN3VyNHNyc2xwM3Fyci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMDI5Mjg3MzMzMjc3NDE4Njc4OCIsImVtYWlsIjoiZWR3YXJkanpob3VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI1S1RxMjJNNThpbVBlamFPWngwTmpnIiwibmFtZSI6IkVkd2FyZCBaaG91IiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tT1ljYzE5QW8xaVEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVja3pxYmpwWmJvMTVzbVVNNGdMdmxmTUZyOHp4QS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiRWR3YXJkIiwiZmFtaWx5X25hbWUiOiJaaG91IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTAxNTA0MDYsImV4cCI6MTU5MDE1NDAwNiwianRpIjoiYTI0MDU0YmI2NTgzYjNjNjlmZTJkNjVhZTU3ZDZiZGMyOTNmNzg4YiJ9.Tp5GFaEzKNzz5T2ShupZnmUZn_XZf4fe06LJ774yDswmg35gKTtJesBBpeIpm0RHipRAvzqxf-xSSkyv52cylHTl4wwPMlaTmEfTjpKm1ANKfLI1TrnJflBB1v_ZV6xV1DaIuwss53IH4AacakN2eHnlp9nzk2obGrhFY80qB5kewHNBAGi4VtE5HspjoeYlhaUtkU-9TnIsnu3pqTBYAsfIovaQUWn9GHGGmk4qfrGKltWM5EyDsL-jYARut1_Vs6jmWE8jY_eWKUt1Dpm5-iav_4WzV273Vge0bkP0vqZiGKrW2UyqPJiw93qMirvxc2CT6OqH3dNKvbN-kyXtwA"
        @data = URI.parse(url).read
        # source= open(url).read
        render json: @data
        # @users = User.all
        # render "api/users/index"

        # require 'net/http'

        # source = Net::HTTP.get('stackoverflow.com', '/index.html')
        # p source
        # p source.to_s 
        # render json: source.to_s
    end


    def googleauth
        require 'net/http'
        id_token = auth_params[:id_token]
        email = auth_params[:email]

        
        url = URI.parse(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{id_token}`)
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port) {|http| http.request(req)}
        puts res.body
        render json: res

        # render json: auth_params
    end
    #     # render all users last updated_at within 24 hrs for funs
    #     @users = User.order(updated_at: :desc).pluck(:updated_at)
    #     # @users = User.where('updated_at: (Time.now.midnight - 1.day})..Time.now.midnight')
    #     render "api/users/index"
        
    # end


    # a select returns 2 columns
    # can i do:
    # select 1 of those columns
    # from the 2 column returning subquery

    #subquery in from must have alias

# results = ActiveRecord::Base.connection.execute("SELECT asdf FROM (SELECT user_one_id, user_two_id FROM friendships ) as asdf").values

# # How does a database know when to use an index? When a query like “SELECT * FROM Employee WHERE Employee_Name = ‘Abc’ ” is run, the database will check to see if there is an index on the column(s) being queried.
# results = ActiveRecord::Base.connection.execute("SELECT COUNT(*) FROM (SELECT user_one_id, user_two_id FROM friendships ) as asdf").values
#     def index
#         results = ActiveRecord::Base.connection.execute("SELECT users.id, (SELECT user_one_id FROM friendships) AS friend FROM users WHERE users.id IN friend")
#         results.values

# SELECT FirstName, LastName, 
#        OrderCount = (SELECT COUNT(O.Id) FROM [Order] O WHERE O.CustomerId = C.Id)
#   FROM Customer C 

# case when then 
# left outer join max height =  left * right  and min height = left
# inner join max rows is left*right as well since each intersection becomes 2 rows 
# from of multiple tables is the cartesian product which kinda explains the above 
# if theres normalization with unique primary keys that may have multiple foreign keys there hsould be no join duplications if its the primary key table left joining

# # ALL payments related to a bill im involved in
# SELECT * 
# FROM payments
# WHERE payments.bill_id IN ( 
#     SELECT *
#     FROM bills
#     WHERE lender_id = current_user.id OR borrower_id = current_user.id
# )

# # ALL PAYMENTS & ALL COMMENTS related to ALL BILLS im involved in
# SELECT * , ALL_BILLS  # Does this work?
# FROM payments
# JOIN 
# WHERE payments.bill_id IN ( 
#     SELECT *
#     FROM bills
#     WHERE lender_id = current_user.id OR borrower_id = current_user.id
# ) AS ALL_BILLS
    # end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :id_token)
        # params.require(:user).permit!
    end

    def auth_params
        params.require(:user).permit(:id_token, :email)
    end

end


# # $.ajax({
#         method: 'POST',
#         url: '/api/user',
#         data: {user: {username: 'wqerqwder', password: 'asdfasdf', email: 'asdfasddfasd3f' }}
#     })


#LESSON LEARNED: NEEDED TO PUT MORE IMPORT INTO MAKING A GOOD DESIGN DOC
# now tis painful


#NOSQL is definitely better than a SQL db for handling SPLITWISE as 1. a user isnt isolated from other users 2. there are many writes 3. have to be careful what info gets out since its $
#comments are never immediately needed for UI/display/any automatically mounting components 
# but bills are
# but then comments are nested under bills as 1 bill has many comments
# so do i do keep fetchCommnets() and  fetchBills() separate
# or may as well nest? both under fetchBills? same with payments
# its relaly difficult to make a judgment call
# best way is to just get everything in a big batch call and let the user  deal with  WAITING and also processing the indexing arrays ? 
# because to make an array of comment_id's associated with a bill I have to make an extra query per bill and do some controller processing i guess

# # ALL BILLS IM INVOLVED IN
# SELECT * 
# FROM bills
# WHERE lender_id = current_user.id OR borrower_id = current_user.id


# # ALL payments related to a bill im involved in
# SELECT * 
# FROM payments
# WHERE payments.bill_id IN ( 
#     SELECT *
#     FROM bills
#     WHERE lender_id = current_user.id OR borrower_id = current_user.id
# )

# # ALL PAYMENTS & ALL COMMENTS related to ALL BILLS im involved in
# SELECT * , ALL_BILLS  # Does this work?
# FROM payments
# JOIN 
# WHERE payments.bill_id IN ( 
#     SELECT *
#     FROM bills
#     WHERE lender_id = current_user.id OR borrower_id = current_user.id
# ) AS ALL_BILLS

# {

#     ALL USERS: {
#         user_id :{ user data }
#     },

#     BILLS IM INVOLVED IN: {
#         bill_id : { bill data, WITH THE ADDITION of an array of comment_ids associated with this bill_id }
#     }

#     ALL COMMENTS ON ALL MY BILLS : {
#        comment ID: { comment data}  
#     } 

#     ALL FRIENDS: [user id of friends ]

# }


# {
#     MY FRIENDSHIPS : {
#         by USERID OF MY FRIEND : {
#             "post1" : {
#                 id : "post1",
#                 author : "user1",
#                 body : "......",
#                 comments : ["comment1", "comment2"]
#             },
#             "post2" : {
#                 id : "post2",
#                 author : "user2",
#                 body : "......",
#                 comments : ["comment3", "comment4", "comment5"]
#             }
#         },
#         allIds : ["post1", "post2"]
#     },
#        : {
#         byId : {
#             "post1" : {
#                 id : "post1",
#                 author : "user1",
#                 body : "......",
#                 comments : ["comment1", "comment2"]
#             },
#             "post2" : {
#                 id : "post2",
#                 author : "user2",
#                 body : "......",
#                 comments : ["comment3", "comment4", "comment5"]
#             }
#         },
#         allIds : ["post1", "post2"]
#     },
#     COMMENTS MADE BY SOMEONE ON A BILL I WAS INVOLVED IN : {
#         byId : {
#             "comment1" : {
#                 id : "comment1",
#                 author : "user2",
#                 comment : ".....",
#             },
#             "comment2" : {
#                 id : "comment2",
#                 author : "user3",
#                 comment : ".....",
#             },
#             "comment3" : {
#                 id : "comment3",
#                 author : "user3",
#                 comment : ".....",
#             },
#             "comment4" : {
#                 id : "comment4",
#                 author : "user1",
#                 comment : ".....",
#             },
#             "comment5" : {
#                 id : "comment5",
#                 author : "user3",
#                 comment : ".....",
#             },
#         },
#         allIds : ["comment1", "comment2", "comment3", "commment4", "comment5"]
#     },
#     ALL USERS : {
#         byId : {
#             "user1" : {
#                 username : "user1",
#                 name : "User 1",
#             },
#             "user2" : {
#                 username : "user2",
#                 name : "User 2",
#             },
#             "user3" : {
#                 username : "user3",
#                 name : "User 3",
#             }
#         },
#         allIds : ["user1", "user2", "user3"]
#     }
# }