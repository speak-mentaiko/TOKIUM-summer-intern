class User < ApplicationRecord
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :email, presence: true, uniqueness: true, on: :create
end
