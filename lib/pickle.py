#!/usr/bin/python

from chatterbotapi import ChatterBotFactory, ChatterBotType
import sys
import socket

factory = ChatterBotFactory()

bot1 = factory.create(ChatterBotType.CLEVERBOT)
bot1session = bot1.create_session()

bot2 = factory.create(ChatterBotType.PANDORABOTS, 'b0dafd24ee35a477')
bot2session = bot2.create_session()

name = sys.argv[1];
test = raw_input("Say: ");
s = bot2session.think(test);
f = open(str(name) + "-robot1", "aw");
f.write(str(name) + ": " + test + "\n");
f.write("Robot1" + ": " + s + "\n");
