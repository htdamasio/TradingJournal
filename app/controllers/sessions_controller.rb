class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }, status: :created
    else
      render json: {
        status: 401,
        errors: [ "Invalid username or password" ]
      }, status: :unauthorized
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }, status: :ok
    else
      render json: {
        logged_in: false,
        message: "No user currently logged in"
      }, status: :unauthorized
    end
  end

  def logout
    reset_session
    render json: {
      status: 200,
      logged_out: true
    }, status: :ok
  end
end
