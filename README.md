# Quill-Edit-Multiple

A sample application showing how you can have multiple editable areas of your app using the Quill editor with only one toolbar, moving the editor around.

## How it works

I'm creating one instance of Quill, using a custom toolbar positioned at the top. The editor element is placed in a temporary, hidden, container. When the user double clicks any of the three text containers (Editables), the editor element will be transplanted form this temporary container to a new location inside the Editable. If a user hits the escape key, the Editable will be deactivated, moving the editor element back to the temporary container.

For more info, see implementation details in the code. I'm using React for this proof-of-concept app. I'm sorry for those of you not familiar with React, I hope you will be able to follow the logic anyway. If not, it's time for you to learn React ;)
