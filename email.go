package email

import (
	"embed"
	"encoding/json"
	"errors"
	"regexp"
	"strings"
)

//go:embed data/freemail.json
var f embed.FS

var FreemailData map[string][]string

func init() {
	rawFreemailJSON, err := f.ReadFile("data/freemail.json")
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(rawFreemailJSON, &FreemailData); err != nil {
		panic(err)
	}
}

func IsFree(email string) (bool, error) {
	domain := email[strings.LastIndex(email, "@")+1:]
	if domain == "" {
		return false, errors.New("invalid email address")
	}

	firstCharRegex, ok := FreemailData[string(domain[0])]
	if ok {
		for _, regexString := range firstCharRegex {
			r, err := regexp.Compile(regexString)
			if err != nil {
				return false, err
			}
			if r.MatchString(domain) {
				return true, nil
			}
		}
	}

	splatRegex := FreemailData["*"]
	for _, regexString := range splatRegex {
		r, err := regexp.Compile(regexString)
		if err != nil {
			return false, err
		}
		if r.MatchString(domain) {
			return true, nil
		}
	}

	return false, nil
}
