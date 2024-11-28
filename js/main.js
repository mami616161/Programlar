import { GameState } from './gameState.js';
import { PuzzleGenerator } from './puzzleGenerator.js';
import { UIController } from './uiController.js';

class Game {
    constructor() {
        this.gameState = new GameState();
        this.puzzleGenerator = new PuzzleGenerator();
        this.uiController = new UIController();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startNewLevel();
    }

    setupEventListeners() {
        const checkButton = document.getElementById('checkButton');
        const nextLevelButton = document.getElementById('nextLevel');
        const changeCategoryButton = document.getElementById('changeCategory');

        if (checkButton) {
            checkButton.addEventListener('click', () => this.checkSolution());
        }
        if (nextLevelButton) {
            nextLevelButton.addEventListener('click', () => this.nextLevel());
        }
        if (changeCategoryButton) {
            changeCategoryButton.addEventListener('click', () => this.uiController.showCategoryModal());
        }
    }

    startNewLevel() {
        const puzzle = this.puzzleGenerator.generatePuzzle(
            this.gameState.getCurrentLevel(),
            this.gameState.getCurrentCategory()
        );
        this.gameState.setCurrentPuzzle(puzzle);
        this.uiController.renderPuzzle(puzzle);
    }

    checkSolution() {
        const isCorrect = this.gameState.checkSolution();
        this.uiController.showResult(isCorrect);
        
        if (isCorrect) {
            const nextLevelButton = document.getElementById('nextLevel');
            if (nextLevelButton) {
                nextLevelButton.style.display = 'block';
            }
        }
    }

    nextLevel() {
        if (this.gameState.incrementLevel()) {
            this.startNewLevel();
        } else {
            this.uiController.showGameComplete();
        }
    }
}

// Start the game
new Game();