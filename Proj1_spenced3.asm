; Program Title : Elementary Arithmetic
; Author: Daniel Spencer
; Last Modified : 04 / 19 / 24
; OSU email address : spenced3@osu.edu
; Course number / section: CS 271 Section 400
; Project Number : 1 Due Date : 04 / 21 / 24
; Description: This program prompts the user for three numbers in descending order,
;              calculates various sums and differences, and displays the results.


INCLUDE Irvine32.inc

.data
introMessage      db 	"Elementary Arithmetic by Daniel Spencer", 0dh, 0ah, 0
inputMessage      db 	"PLease enter First Number", 0
promptMessage     db 	"Please enter three numbers in decending order, press enter after each entry", 0dh,0ah, 0o
inputMessage2     db 	"Second number: ", 0
inputMessage3     db 	"Third number: ", 0
errorMessage      db 	"Please enter the numbers in descending order.", 0dh, 0ah, 0
goodbyeMessage    db 	"Thanks for using Elementary Arithmetic", 0dh, 0ah, 0
plusString        db 	" + ", 0
minusString       db 	" - ", 0
equalsString      db 	" = ", 0
newLine           db 	0dh, 0ah, 0; New line characters
numberA           dd 	?
numberB           dd 	?
numberC           dd 	?
sumResult         dd 	?
diffResult        dd 	?

.code
main PROC
	; Introduction
	mov edx, OFFSET introMessage
	call WriteString

	; Display prompt message
	mov edx, OFFSET promptMessage
	call WriteString

; Get the Data
	call GetNumbers

; Calculate and Display the Required Values
	call CalculateAndDisplay

; Say Goodbye
	mov edx, OFFSET goodbyeMessage
	call WriteString

exit
main ENDP

GetNumbers PROC
Read first number
mov edx, OFFSET inputMessage
call WriteString
call ReadInt
mov numberA, eax

; Read second number
	mov edx, OFFSET inputMessage2
	call WriteString
	call ReadInt
	mov numberB, eax

; Read third number
	mov edx, OFFSET inputMessage3
	call WriteString
	call ReadInt
	mov numberC, eax

; Validate Input
	mov eax, numberA
	cmp eax, numberB
	jle InvalidInput
	mov eax, numberB
	cmp eax, numberC
	jle InvalidInput
	ret

InvalidInput :
	mov edx, 	OFFSET errorMessage
	call WriteString
	jmp GetNumbers
	GetNumbers ENDP

CalculateAndDisplay PROC
; A + B
mov eax, numberA
call WriteDec
mov edx, OFFSET plusString
call WriteString
mov eax, numberB
call WriteDec
mov edx, OFFSET equalsString
call WriteString
mov eax, numberA
add eax, numberB
mov sumResult, eax
call WriteDec
mov edx, OFFSET newLine
call WriteString

; A - B
mov eax, numberA
call WriteDec
mov edx, OFFSET minusString
call WriteString
mov eax, numberB
call WriteDec
mov edx, OFFSET equalsString
call WriteString
mov eax, numberA
sub eax, numberB
mov diffResult, eax
call WriteDec
mov edx, OFFSET newLine
call WriteString

; A + C
mov eax, numberA
call WriteDec
mov edx, OFFSET plusString
call WriteString
mov eax, numberC
call WriteDec
mov edx, OFFSET equalsString
call WriteString
mov eax, numberA
add eax, numberC
call WriteDec
mov edx, OFFSET newLine
call WriteString

; A - C
mov eax, numberA
call WriteDec
mov edx, OFFSET minusString
call WriteString
mov eax, numberC
call WriteDec
mov edx, OFFSET equalsString
call WriteString
mov eax, numberA
sub eax, numberC
call WriteDec
mov edx, OFFSET newLine
call WriteString

; B + C
mov eax, numberB
call WriteDec
mov edx, OFFSET plusString
call WriteString
mov eax, numberC
call WriteDec
mov edx, OFFSET equalsString
call WriteString
mov eax, numberB
add eax, numberC
call WriteDec
mov edx, OFFSET newLine
call WriteString

; B - C
mov eax, numberB
call WriteDec
mov edx, OFFSET minusString
call WriteString
mov eax, numberC
call WriteDec



; B - C
mov eax, numberB
call WriteDec
mov edx, OFFSET minusString
call WriteString
mov eax, numberC
call WriteDec
mov edx, OFFSET equalsString
call WriteString
mov eax, numberB
sub eax, numberC
call WriteDec
mov edx, OFFSET newLine
call WriteString




; A + B + C
mov eax, numberA
call WriteDec
mov edx, OFFSET plusString
call WriteString
mov eax, numberB
call WriteDec
mov edx, OFFSET plusString
call WriteString
mov eax, numberC
call WriteDec
mov edx, OFFSET equalsString
call WriteString
mov eax, numberA
add eax, numberB
add eax, numberC
call WriteDec
mov edx, OFFSET newLine
call WriteString

ret
CalculateAndDisplay ENDP

END main