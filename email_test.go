package email_test

import (
	"regexp"
	"testing"

	"github.com/withevideo/email"
)

func TestIsFree(t *testing.T) {
	tests := []struct {
		email  string
		isFree bool
	}{
		{"liam@acme.co", false},
		{"liam@gmail.com", true},
		{"liam@hotmail.ca", true},
		{"liam@onmicrosoft.com", false},  // Missing splat portion of regex so is not free email.
		{"liam@a.onmicrosoft.com", true}, // Matches splat regex, so is free email.
		{"liam@-.onmicrosoft.com", true}, // Skip first char, matches splat, so is free email.
	}

	for _, tt := range tests {
		result, err := email.IsFree(tt.email)
		if err != nil {
			t.Errorf("IsFree(%q) returned error: %v", tt.email, err)
		}

		if result != tt.isFree {
			t.Errorf("IsFree(%q) returned %v, expected %v", tt.email, result, tt.isFree)
		}
	}
}

func TestNoRegexCompileErrors(t *testing.T) {
	for _, regexList := range email.FreemailData {
		for _, regexString := range regexList {
			_, err := regexp.Compile(regexString)
			if err != nil {
				t.Errorf("Failed to compile regex: %v", err)
			}
		}
	}
}
