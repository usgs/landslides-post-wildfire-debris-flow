<?php

echo navItem('/example.php', 'Examples');

print navGroup('Detail',
    navItem('/DetailViewExample.php', 'Detail View')
  );

?>
