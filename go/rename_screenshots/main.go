package main

import (
	"errors"
	"io/ioutil"
	"os"
	"path"
	"regexp"
)

func main() {
	argsWithoutProg := os.Args[1:]
	currentWorkingDir := argsWithoutProg[0]
	if len(argsWithoutProg) == 0 {
		panic(errors.New("Need directory"))
	}
	fileInfos, err := ioutil.ReadDir(currentWorkingDir)

	if err != nil {
		panic(err)
	}

	r := regexp.MustCompile("Screenshot from [\\d\\ \\-]+\\.png")
	r2 := regexp.MustCompile(" ")

	for _, fi := range fileInfos {
		if r.MatchString(fi.Name()) {
			newName := r2.ReplaceAllString(fi.Name(), "_")
			os.Rename(path.Join(currentWorkingDir, fi.Name()), path.Join(currentWorkingDir, newName))
		}
	}
}
