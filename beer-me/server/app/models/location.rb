class Location < ActiveRecord::Base
	has_and_belongs_to_many :beers
	# write a method using regex to find the zip code from string input of full address
	# be sure that no errors are thrown if the method does not find a zip code
	
end
