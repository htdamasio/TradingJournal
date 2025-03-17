class RegistrationsController < ApplicationController
  def create
    puts("Reaching here 1")
    user = User.create(
      email:  params["user"]["email"],
      password: params["user"]["password"],
      password_confirmation: params["user"]["password_confirmation"]
    )

    puts("Reaching here 2")
    if user.save
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }, status: :created
    else
      render json: {
        status: 500,
        errors: user.errors.full_messages
      }, status: :internal_server_error
    end
  end
end
