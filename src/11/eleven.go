package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
)

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	var lines []string

	for scanner.Scan() {
		line := scanner.Text()

		lines = append(lines, line)
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Scanner error:", err)
		return
	}

	expandUniverse(&lines)

	galaxies := getGalaxies(lines)

	var result float64

	for g, galaxy := range galaxies {
		for _, rest := range galaxies[:g] {
			result += math.Abs(float64((galaxy[0] - rest[0])))
			result += math.Abs(float64((galaxy[1] - rest[1])))
		}

	}
	fmt.Printf("Result: %.0f\n", result)

}

func getGalaxies(universe []string) [][]int {

	galaxies := [][]int{}

	for i := 0; i < len(universe); i++ {
		for j := 0; j < len(universe[i]); j++ {
			if universe[i][j] == byte('#') {
				curr := []int{i, j}
				galaxies = append(galaxies, curr)

			}
		}
	}
	return galaxies
}

func expandUniverse(lines *[]string) {

	emptyIndices := []int{}

	for j := 0; j < len((*lines)[0]); j++ {
		if (*lines)[0][j] == '.' {
			isEmptyCol := true
			for k := 0; k < len(*lines); k++ {
				if (*lines)[k][j] != byte('.') {
					isEmptyCol = false
				}
			}
			if isEmptyCol {
				emptyIndices = append(emptyIndices, j)

			}

		}

	}
	for t := 0; t < len(emptyIndices); t++ {
		emptyIndices[t] = t + emptyIndices[t]
	}

	for i := 0; i < len(*lines); i++ {

		for e := 0; e < len(emptyIndices); e++ {
			(*lines)[i] = insertRune((*lines)[i], emptyIndices[e], '.')
		}

		if isEmpty((*lines)[i]) {

			elementToDuplicate := (*lines)[i]

			*lines = insertElement(*lines, i+1, elementToDuplicate)
			i += 1
		}

	}
}

func isEmpty(line string) bool {

	for _, char := range line {
		if char != '.' {
			return false
		}
	}

	return true
}

func insertElement(slice []string, index int, value string) []string {
	slice = append(slice, "")
	copy(slice[index+1:], slice[index:])
	slice[index] = value
	return slice
}

func insertRune(str string, index int, char rune) string {
	runes := []rune(str)

	runes = append(runes[:index], append([]rune{char}, runes[index:]...)...)
	return string(runes)
}
