require 'pry'

puts "Here we go\n\n"

puts "What is your name? "
name = gets

while(1) do
  result = system("./pickle.py #{name}")

  puts "\n\n******FULL CONVERSATION*******\n"
  directory = name.chomp + "-robot1"
  puts directory
  File.open(directory, 'r') do |f|
    f.each_line do |line|
      puts line
    end
  end
end
