/*
Author: nex
*/

#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <deque>
#include <tuple>
#include <stdio.h>
#include <math.h>

static const char* reportFmt = "|%-5s|%-32s|%17s| %s\n";

typedef long double ld;

using namespace std;

// shunting yard algorithm
// algorithm made by Edsger W. Dijkstra

class Token {
public:
    enum class Type {
        Unknown,
        Number,
        Operator,
        LeftParen,
        RightParen,
    };

    Token(Type type,
          const std::string& s,
          int precedence = -1,
          bool rightAssociative = false,
          bool unary = false
    )
        : type { type }
        , str ( s )
        , precedence { precedence }
        , rightAssociative { rightAssociative }
        , unary { unary }
    {}

    const Type type;
    const std::string str;
    const int precedence;
    const bool rightAssociative;
    const bool unary;
};

ostream& operator<<(ostream& os, const Token token) {
    os << token.str;
    return os;
}

template<class T, class U>
void debugReport(
    const Token& token,
    const T& queue,
    const U& stack,
    const string& comment = ""
) {
    ostringstream ossQueue;
    for (const auto& t : queue) {
        ossQueue << " " << t;
    }

    ostringstream ossStack;
    for (const auto& t : stack) {
        ossStack << " " << t;
    }

    printf(reportFmt, token.str.c_str(), ossQueue.str().c_str(), ossStack.str().c_str(), comment.c_str());
}

deque<Token> exprToTokens(const string& expr) {
    deque<Token> tokens;
    for (const auto* p = expr.c_str(); *p; ++p) {
        if (isblank(*p)) {
            continue;
        } else if (isdigit(*p)) {
            const auto* b = p;
            while (isdigit(*p)) {
                ++p;
            }
            const auto s = string(b,p);
            tokens.push_back(Token {Token::Type::Number, s});
            --p;
        } else {
            Token::Type t = Token::Type::Unknown;
            int precedence = -1;
            bool rightAssociative =  false;
            bool unary = false;
            char c = *p;
            
            switch (c) {
                default:
                    break;
                case '(':
                    t = Token::Type::LeftParen;
                    break;
                case ')':
                    t = Token::Type::RightParen;    
                    break;
                case '^':   
                    t = Token::Type::Operator;      
                    precedence = 4; rightAssociative = true;  
                    break;
                case '*':   
                    t = Token::Type::Operator;      
                    precedence = 3; 
                    break;
                case '/':   
                    t = Token::Type::Operator;      
                    precedence = 3; 
                    break;
                case '+':   
                    t = Token::Type::Operator;      
                    precedence = 2; break;
                case '-':
                    if(   tokens.empty()
                    || tokens.back().type == Token::Type::Operator
                    || tokens.back().type == Token::Type::LeftParen
                    ) {
                        unary = true;
                        c = 'm';
                        t = Token::Type::Operator;
                        precedence = 5;
                    } else {
                        t = Token::Type::Operator;
                        precedence = 2;
                    }
                    break;
                
            }
            const auto s = std::string(1, c);
            tokens.push_back(Token { t, s, precedence, rightAssociative, unary });
        }
    }
    return tokens;

}

deque<Token> shuntingYard(const deque<Token>& tokens) {
    deque<Token> queue;
    vector<Token> stack;

    for (auto token: tokens) {
        switch(token.type) {
            case Token::Type::Number:
                queue.push_back(token);
                break;
            case Token::Type::Operator:
                {
                    const auto o1 = token;
                    while (!stack.empty()) {
                        const auto o2 = stack.back();
                        if (
                            (!o1.rightAssociative && o1.precedence <= o2.precedence) ||
                            (o1.rightAssociative && o1.precedence <= o2.precedence)
                        ) {
                            stack.pop_back();
                            queue.push_back(o2);
                            continue;
                        }
                        break;
                    }
                    stack.push_back(o1);
                }
                break;
            case Token::Type::LeftParen:
                stack.push_back(token);
                break;
            case Token::Type::RightParen:
                {
                    bool match = false;
                    while (!stack.empty() && stack.back().type != Token::Type::LeftParen) {
                        queue.push_back(stack.back());
                        stack.pop_back();
                        match = true;
                    }

                    if (!match && stack.empty()) {
                        printf("RightParen error (%s)\n", token.str.c_str());
                        return {};
                    }

                    stack.pop_back();
                }
                break;
            default:
                printf("Error (%s)\n", token.str.c_str());
                return {};
        }
        debugReport(token,queue,stack);
    }

    while (!stack.empty()) {
        if (stack.back().type == Token::Type::LeftParen) {
            printf("Mismatched parentheses error\n");
            return {};
        }
        queue.push_back(move(stack.back()));
        stack.pop_back();
    }

    debugReport(Token {Token::Type::Unknown, "End"},queue,stack);

    return queue;
}

int32_t compute(const string& expr) {
    printf("Tokenize\n");
    printf(reportFmt,"Token","Queue","Stack","");
    const auto tokens = exprToTokens(expr);
    auto queue = shuntingYard(tokens);
    vector<int> stack;

    printf("\nCalculation\n");
    printf(reportFmt,"Token","Queue","Stack","");

    while (!queue.empty()) {
        string op;
        const auto token = queue.front();
        queue.pop_front();
        switch(token.type) {
            case Token::Type::Number:
                stack.push_back(stoi(token.str));
                op = "Push " + token.str;
                break;
            case Token::Type::Operator:
                {
                    if (token.unary) {
                        const auto rhs = stack.back();
                        stack.pop_back();
                        switch(token.str[0]) {
                            default:
                                printf("Operator error [%s]\n",token.str.c_str());
                                exit(0);
                                break;
                            case 'm':
                                stack.push_back(-rhs);
                                break;
                        }
                        op = "Push (unary) " + token.str + " " + to_string(rhs);
                    } else {
                        const auto rhs = stack.back();
                        stack.pop_back();
                        const auto lhs = stack.back();
                        stack.pop_back();
                        switch (token.str[0]) {
                            default:
                                printf("Operator error [%s]\n", token.str.c_str());
                                exit(0);
                                break;
                            case '^':
                                stack.push_back(static_cast<int>(pow(lhs,rhs)));
                                break;
                            case '*':
                                stack.push_back(lhs*rhs);
                                break;
                            case '/':
                                stack.push_back(lhs / rhs);
                                break;
                            case '+':
                                stack.push_back(lhs + rhs);
                                break;
                            case '-':
                                stack.push_back(lhs - rhs);
                                break;
                        }
                        op = "Push " + to_string(lhs) + " "  + token.str + " " + to_string(rhs);
                    }
                }
                break;

                default:
                    printf("Token error\n");
                    exit(0);

        }
        debugReport(token,queue,stack,op);
       
    }
    return stack.back();
}


int main() {
    printf("Shunting-yard\n");

    const std::vector<std::tuple<std::string, int32_t>> testCases = {
        { "3+4*2/(1-5)^2^3" , 3     },  // Wikipedia's example
        { "(2*3+3*4)"       , 18    },  // Report from @2kaud.
        { "(3)+(4)"         , 7     },  // Report from @kayshav.
        { "(-3)*(-2^3)"     , 24    },  // Unary '-'
        
        // TODO floating point numbers
        // { "0.1^-3"          , 1000  },  // Negative exponents
    };

    int errorCount = 0;
    int testCount = 0;

    for(const auto& testCase : testCases) {
        testCount += 1;
        const std::string& expr = std::get<0>(testCase);
        const int32_t expected = std::get<1>(testCase);
        printf("expr = %s\n\n", expr.c_str());

        const int32_t result = compute(expr);

        printf("\n  result = %d, expected = %d, ", result, expected);
        if(result == expected) {
            printf("OK\n\n\n");
        } else {
            printf("NG\n\n\n");
            errorCount += 1;
        }
    }

    if(errorCount != 0 || testCount != static_cast<int>(testCases.size())) {
        printf("ERROR (errorCount=%d, testCount=%d)\n", errorCount, testCount);
        exit(EXIT_FAILURE);
    } else {
        printf("OK\n");
        exit(EXIT_SUCCESS);
    }
}