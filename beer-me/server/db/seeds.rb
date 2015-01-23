# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

location1 = Location.create({name: "a bar", address: "somewhere in sf", zip_code: 94110})
location2 = Location.create({name: "another bar", address: "somewhere not in sf", zip_code: 23948})

beer1 = Beer.create(
	{name: "Monk's Blood", 
		abv: "9.5%", 
		rating: "*****", 
		price: "$8.75", 
	}
) 						

beer1.locations << location1
beer1.locations << location2



location3 = Location.create({name: "a bar", address: "somewhere in sf", zip_code: 94110})
location4 = Location.create({name: "another bar", address: "somewhere not in sf", zip_code: 23948})

beer2 = Beer.create(
	{name: "Monk's Blood", 
		abv: "9.5%", 
		rating: "*****", 
		price: "$8.75", 
	}
) 				

beer2.locations << location3
beer2.locations << location4


location5 = Location.create({name: "a bar", address: "somewhere in sf", zip_code: 94110})
location6 = Location.create({name: "another bar", address: "somewhere not in sf", zip_code: 23948})

beer3 = Beer.create(
	{name: "Monk's Blood", 
		abv: "9.5%", 
		rating: "*****", 
		price: "$8.75", 
	}
) 				

beer3.locations << location5
beer3.locations << location6

