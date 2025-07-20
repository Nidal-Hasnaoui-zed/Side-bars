// Wait for DOM content loaded
    document.addEventListener('DOMContentLoaded', () => {
      const listContainer = document.getElementById('list-container');
      const tagContainer = document.getElementById('tag-container');
      const addListBtn = document.getElementById('add-list-btn');
      const addTagBtn = document.getElementById('add-tag-btn');
      const navLinks = document.querySelectorAll('.nav-link[data-link]');
      const iconScaleClicks = document.querySelectorAll('.scale-click');

      // Load lists and tags from localStorage
      function loadStorage() {
        const savedLists = JSON.parse(localStorage.getItem('myLists')) || [];
        const savedTags = JSON.parse(localStorage.getItem('myTags')) || [];

        savedLists.forEach(item => {
          addListElement(item, false);
        });

        savedTags.forEach(item => {
          addTagElement(item, false);
        });
      }

      // Save lists and tags to localStorage
      function saveStorage() {
        const lists = [...listContainer.querySelectorAll('.nav-link[data-list-name]')]
          .map(el => el.dataset.listName);
        const tags = [...tagContainer.querySelectorAll('.tag')]
          .map(el => el.textContent.trim().replace(/^#/, ''));

        localStorage.setItem('myLists', JSON.stringify(lists));
        localStorage.setItem('myTags', JSON.stringify(tags));
      }

      // Add a new list element to DOM
      function addListElement(name, save = true) {
        // Avoid duplicates
        if ([...listContainer.children].some(el => el.dataset.listName === name)) return;

        const div = document.createElement('div');
        div.className = 'nav-link';
        div.dataset.listName = name;
        div.textContent = name;
        div.style.cursor = 'pointer';

        div.addEventListener('click', () => {
          setActiveLink(div);
        });

        listContainer.appendChild(div);

        if(save) saveStorage();
      }

      // Add a new tag element to DOM
      function addTagElement(name, save = true) {
        // Avoid duplicates
        if ([...tagContainer.children].some(el => el.textContent.trim().toLowerCase() === `#${name.toLowerCase()}`)) return;

        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = `#${name}`;

        tagContainer.appendChild(span);

        if(save) saveStorage();
      }

      // Handle adding input for list or tag
      function createInput(container, type) {
        // Check if input already exists
        if(container.querySelector('input.add-input')) return;

        const input = document.createElement('input');
        input.className = 'add-input';
        input.placeholder = `Enter new ${type}`;
        container.prepend(input);
        input.focus();

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const val = input.value.trim();
            if (val) {
              if (type === 'list') addListElement(val);
              else if (type === 'tag') addTagElement(val);
            }
            input.remove();
          } else if (e.key === 'Escape') {
            input.remove();
          }
        });

        // Remove input on blur
        input.addEventListener('blur', () => {
          input.remove();
        });
      }

      // Highlight active nav link
      function setActiveLink(selectedLink) {
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        if(selectedLink) {
          selectedLink.classList.add('active');
        }
      }

      // Initial active link (e.g., My Day)
      const initialActive = document.querySelector('.nav-link[data-link="my-day"]');
      if(initialActive) setActiveLink(initialActive);

      // Add click listeners for nav links for highlighting
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          setActiveLink(link);
        });
      });

      // Add click listeners for add icons
      addListBtn.addEventListener('click', () => createInput(listContainer, 'list'));
      addTagBtn.addEventListener('click', () => createInput(tagContainer, 'tag'));

      // Animate icons scale on click
      iconScaleClicks.forEach(icon => {
        icon.addEventListener('click', () => {
          icon.classList.add('clicked');
          setTimeout(() => icon.classList.remove('clicked'), 200);
        });
      });

      loadStorage();
    });