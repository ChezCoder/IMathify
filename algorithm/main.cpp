/*
Author: nex
*/

#include <iostream>
#include <string>
#include <vector>
#include <sstream>

typedef long double ld;

using namespace std;

int main() {
    cin.sync_with_stdio(0);
    cin.tie(0);
    
    /*
    We are given a string of math operations.
    */
    string theEquation;
    getline(cin, theEquation);
    stringstream myStream(theEquation);

    vector<string> operations;

    int currIdx = 0;

    string element;
    while (myStream >> element) {
        operations.push_back(element);
        if (currIdx >= 2) {
            if (operations[currIdx-1] == "*") {
                operations[currIdx-2] = to_string(stold(operations[currIdx]) * stold(operations[currIdx-2]));
                operations.pop_back();
                operations.pop_back();
                currIdx -= 2;
            } else if (operations[currIdx-1] == "/") {
                if (operations[currIdx] == "0") {
                    cout << "Error: Division by 0\n";
                    return 0;
                }
                operations[currIdx-2] = to_string(stold(operations[currIdx-2]) / stold(operations[currIdx]));
                operations.pop_back();
                operations.pop_back();
                currIdx -= 2;
            }
        }
        currIdx += 1;
    }

    cout << operations[0] << "\n";
    return 0;
}