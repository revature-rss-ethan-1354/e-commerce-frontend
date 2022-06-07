# Project 3
## Teams
1. Search /Create /Delete (Featured Products / Featured Products Admin)
    Joseph - team lead 1
    Parth 
    Philip - team lead 2
    Justin
    Hassan
    Mohamed
    Hailey - team lead 1
    Jaya
    Robert

3. Chat
    Chime 
    Nabil
    Milan - team lead 1
    Lilianne
    Victor
    Swathi

4. Input Validation / UX-UI Error handling
    Darryl - team lead 2*
    Kenneth
    Dawit
    Hailey - team lead 1*
    Mohammad
    Bayode
    Nabil

6. Front-End Styling
    Parth, 

7. Jenkins
    Darryl
    Chime


### Things to remember
Always git pull before creating a new branch

### Creating a new branch
git checkout develop (Start from the develop branch)
git pull
git checkout -b feature/ OR style/ OR bug/(bug-to-fix)

#

### Merging feature branch into develop
save your work and push it to yor branch git add . -> git commit -m " " -> git push origin feature/
git checkout develop
git pull (always do a pull before you merge, you will get an error if you try to merge when the develop branch is behind)
git merge your-branch-name
git push (push the changes that you merged into develop)
Merge Conflicts
When you get a merge conflict, open VS Code and see what changes need to be approved
