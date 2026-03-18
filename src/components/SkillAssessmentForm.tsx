{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
  <SelectItem key={level} value={level.toString()}> // Fixed: Convert number to string
    {level} - {level <= 3 ? 'Beginner' : level <= 6 ? 'Intermediate' : 'Advanced'}
  </SelectItem>
))}