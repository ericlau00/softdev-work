# K #05: ...and I want to Paint It Better

Due **F 2020-02-07**, 08:00, EST.

- Form a new dynamic duo of destiny with the Devo opposite your last partner. (Eg, for most of you: If your last partner was at my_wkstn-1, then your new one is at my_wkstn+1.)

- With your new partner, peruse the workshops of at least 3 other duos with an eye toward

  - how they did it
  - how well they did it
  - how clean their code is
  - how effective their comments are
  - whether they used anything unfamiliar to you

- With your new partner, and enlightenment gained through workshop perusal…

Create a webpage using HTML5 and JavaScript:

- `clickdraw.html`:
  - Must contain a canvas -- though it may skew minimalist or baroque.
  - Must have a clear button that wipes the canvas clean.
  - Must have a **toggle button** that switches between draw-a-rectangle mode and draw-a-dot mode.
- `clickdraw.js`:
  - Facilitates drawing of a box or dot on the canvas...
    - when a user clicks within the border of the canvas (but not outside).
    - at mouse location
      - upper left corner of rectangle
      - center of circle
  - Facilitates clearing of the canvas when user clicks clear button.
  - Employs **state var** for box | dot
  - Contains comments clearly & succinctly explaining
    - `e.preventDefault();`
    - `ctx.beginPath();`
    - `e.offsetX`
    - `e.offsetY`

File this under `05_canvas` in your workshop.
