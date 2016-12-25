#!/usr/bin/env ruby

require 'io/console'

class TooManyLetters < StandardError ; end

class HangmanGame
  attr_accessor :displayed_word, :lives
  attr_reader :word

  def initialize(word)
    @word = word
    @displayed_word = '*' * word.size
    @lives = 3
  end

  def guess_letter(letter)
    raise TooManyLetters if letter.size > 1

    correct = false
    word.chars.each.with_index do |char, index|
      if char == letter
        correct = true
        displayed_word[index] = letter
      end
    end

    @lives -= 1 unless correct
  end

  def start!
    while game_in_progress? do
      draw_hidden_word
      prompt_for_letter
    end

    lives.zero? ? lose : win
  rescue TooManyLetters
    $stdout.puts 'Please only enter one letter, try again'
    retry
  end

  def draw_hidden_word
    $stdout.print "\r#{displayed_word}"
    $stdout.print "    Lives left: #{'X' * lives}   "
  end

  def prompt_for_letter
    $stdout.print "\t\tGuess a letter: "
    guess_letter($stdin.gets.chomp)
  end

  def game_in_progress?
    (not displayed_word == word) || (lives == 0)
  end

  def win
    $stdout.puts 'You win!'
  end

  def lose
    $stdout.puts "You ran out of lives! The word was #{word}"
  end
end

$stdout.puts 'Starting hangman!'
$stdout.print 'Enter a word to play: '
game = HangmanGame.new($stdin.noecho(&:gets).chomp)

game.start!

