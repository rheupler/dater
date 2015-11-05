class CreateTable < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.string :image
      t.string :name

      t.timestamps
    end

    create_table :users_matches do |t|
      t.integer :match_id
      t.integer :user_id

      t.timestamps
    end
  end
end
