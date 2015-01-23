class CreateBeersLocations < ActiveRecord::Migration
  def change
    create_table :beers_locations do |t|
    	t.belongs_to :beer 
    	t.belongs_to :location
    end
  end
end
