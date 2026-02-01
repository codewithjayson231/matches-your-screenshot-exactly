// =============================================
// INK & PAPER - Main Application
// =============================================

// Initialize Firebase
let db;
let articlesRef;
let analyticsRef;
let commentsRef;
let likesRef;

function initFirebase() {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        articlesRef = db.ref('articles');
        analyticsRef = db.ref('analytics');
        commentsRef = db.ref('comments');
        likesRef = db.ref('likes');
        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        return false;
    }
}

// =============================================
// ICONS
// =============================================

const icons = {
    lock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
    dashboard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    share: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    clap: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>',
    comment: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    heartFilled: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 0 000-7.78z"/></svg>',
    facebook: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    whatsapp: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    copyLink: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
    send: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    filter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    articles: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    analytics: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    edit: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    upload: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M17 8l-5-5-5 5"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
    bold: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg>',
    italic: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',
    underline: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>',
    quote: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>',
    link: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>',
    list: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    orderedList: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
    alignLeft: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
    alignCenter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>',
    eye: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    logout: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    sun: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>',
    warning: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
};

// =============================================
// APP STATE
// =============================================

let articles = [];
let analytics = {
    dailyVisits: [],
    totalVisits: 0,
    uniqueVisitors: 0,
    avgTimeOnSite: '0:00'
};

let state = {
    isAdmin: false,
    currentView: 'home',
    selectedArticle: null,
    selectedCategory: 'All',
    searchQuery: '',
    filterStatus: 'all',
    showMobileMenu: false,
    showPreview: false,
    adminTheme: localStorage.getItem('adminTheme') || 'dark',
    publicTheme: localStorage.getItem('publicTheme') || 'light',
    editingArticle: null,
    loading: true,
    error: null,
    // New state for likes, comments, share
    showShareDropdown: false,
    articleComments: {},
    articleLikes: {},
    userLikes: JSON.parse(localStorage.getItem('userLikes') || '{}'),
    newComment: { name: '', text: '' },
    showAdvancedFilters: false,
    filterAuthor: '',
    filterDateFrom: '',
    filterDateTo: '',
    filterTags: [],
    sortBy: 'date', // date, title, views
    sortOrder: 'desc',
    formData: {
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Design',
        tags: [],
        image: '',
        featured: false,
        status: 'draft'
    }
};

// =============================================
// FIREBASE DATA OPERATIONS
// =============================================

function loadArticles() {
    articlesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            articles = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            articles = [];
        }
        state.loading = false;
        state.error = null;
        render();
    }, (error) => {
        console.error('Error loading articles:', error);
        state.error = 'Failed to load articles. Please check your Firebase configuration.';
        state.loading = false;
        render();
    });
}

function loadAnalytics() {
    analyticsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            analytics = data;
        }
    });
}

async function saveArticleToFirebase(articleData) {
    try {
        if (articleData.id && typeof articleData.id === 'string') {
            const { id, ...data } = articleData;
            await articlesRef.child(id).update(data);
            return id;
        } else {
            const { id, ...data } = articleData;
            const newRef = await articlesRef.push(data);
            return newRef.key;
        }
    } catch (error) {
        console.error('Error saving article:', error);
        throw error;
    }
}

async function deleteArticleFromFirebase(articleId) {
    try {
        await articlesRef.child(articleId).remove();
    } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
    }
}

async function trackVisit(articleId = null) {
    const today = new Date().toISOString().split('T')[0];
    
    try {
        await analyticsRef.child('totalVisits').transaction((current) => {
            return (current || 0) + 1;
        });
        
        await analyticsRef.child(`dailyVisits/${today}`).transaction((current) => {
            return (current || 0) + 1;
        });
        
        if (articleId) {
            await articlesRef.child(`${articleId}/views`).transaction((current) => {
                return (current || 0) + 1;
            });
        }
    } catch (error) {
        console.error('Error tracking visit:', error);
    }
}

// =============================================
// LIKES SYSTEM
// =============================================

function loadArticleLikes(articleId) {
    likesRef.child(articleId).on('value', (snapshot) => {
        const count = snapshot.val() || 0;
        state.articleLikes[articleId] = count;
        render();
    });
}

async function toggleLike(articleId) {
    const hasLiked = state.userLikes[articleId];
    
    try {
        if (hasLiked) {
            // Unlike
            await likesRef.child(articleId).transaction((current) => {
                return Math.max(0, (current || 0) - 1);
            });
            delete state.userLikes[articleId];
        } else {
            // Like
            await likesRef.child(articleId).transaction((current) => {
                return (current || 0) + 1;
            });
            state.userLikes[articleId] = true;
        }
        localStorage.setItem('userLikes', JSON.stringify(state.userLikes));
        render();
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}

// =============================================
// COMMENTS SYSTEM
// =============================================

function loadArticleComments(articleId) {
    commentsRef.child(articleId).orderByChild('timestamp').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            state.articleComments[articleId] = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })).sort((a, b) => b.timestamp - a.timestamp);
        } else {
            state.articleComments[articleId] = [];
        }
        render();
    });
}

async function submitComment(articleId) {
    const name = state.newComment.name.trim();
    const text = state.newComment.text.trim();
    
    if (!name || !text) {
        alert('Please enter your name and comment.');
        return;
    }
    
    try {
        await commentsRef.child(articleId).push({
            name: name,
            text: text,
            timestamp: Date.now(),
            date: new Date().toISOString()
        });
        state.newComment = { name: '', text: '' };
        render();
    } catch (error) {
        console.error('Error submitting comment:', error);
        alert('Failed to post comment. Please try again.');
    }
}

function updateCommentField(field, value) {
    state.newComment[field] = value;
}

// =============================================
// SHARE SYSTEM
// =============================================

function toggleShareDropdown() {
    state.showShareDropdown = !state.showShareDropdown;
    render();
}

function closeShareDropdown() {
    state.showShareDropdown = false;
    render();
}

function shareOnFacebook(article) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
    closeShareDropdown();
}

function shareOnTwitter(article) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title + ' - ' + (article.excerpt || '').substring(0, 100));
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    closeShareDropdown();
}

function shareOnWhatsApp(article) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title + '\n\n' + url);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    closeShareDropdown();
}

function copyArticleLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
        closeShareDropdown();
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
        closeShareDropdown();
    });
}

// =============================================
// ADVANCED FILTERING
// =============================================

function toggleAdvancedFilters() {
    state.showAdvancedFilters = !state.showAdvancedFilters;
    render();
}

function updateFilterAuthor(value) {
    state.filterAuthor = value;
    render();
}

function updateFilterDateFrom(value) {
    state.filterDateFrom = value;
    render();
}

function updateFilterDateTo(value) {
    state.filterDateTo = value;
    render();
}

function toggleFilterTag(tag) {
    if (state.filterTags.includes(tag)) {
        state.filterTags = state.filterTags.filter(t => t !== tag);
    } else {
        state.filterTags.push(tag);
    }
    render();
}

function updateSortBy(value) {
    state.sortBy = value;
    render();
}

function updateSortOrder(value) {
    state.sortOrder = value;
    render();
}

function clearAllFilters() {
    state.selectedCategory = 'All';
    state.searchQuery = '';
    state.filterAuthor = '';
    state.filterDateFrom = '';
    state.filterDateTo = '';
    state.filterTags = [];
    state.sortBy = 'date';
    state.sortOrder = 'desc';
    render();
}

function getAllTags() {
    const tags = new Set();
    articles.forEach(article => {
        if (article.tags) {
            article.tags.forEach(tag => tags.add(tag));
        }
    });
    return Array.from(tags).sort();
}

function getAllAuthors() {
    const authors = new Set();
    articles.forEach(article => {
        if (article.author) {
            authors.add(article.author);
        }
    });
    return Array.from(authors).sort();
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getPublishedArticles() {
    return articles.filter(a => a.status === 'published');
}

function getFilteredArticles() {
    let published = getPublishedArticles();
    
    // Category filter
    if (state.selectedCategory !== 'All') {
        published = published.filter(a => a.category === state.selectedCategory);
    }
    
    // Search filter
    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        published = published.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            (article.author && article.author.toLowerCase().includes(query)) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
        );
    }
    
    // Author filter
    if (state.filterAuthor) {
        published = published.filter(a => a.author === state.filterAuthor);
    }
    
    // Date range filter
    if (state.filterDateFrom) {
        published = published.filter(a => new Date(a.date) >= new Date(state.filterDateFrom));
    }
    if (state.filterDateTo) {
        published = published.filter(a => new Date(a.date) <= new Date(state.filterDateTo));
    }
    
    // Tags filter
    if (state.filterTags.length > 0) {
        published = published.filter(a => 
            a.tags && state.filterTags.some(tag => a.tags.includes(tag))
        );
    }
    
    // Sorting
    published.sort((a, b) => {
        let comparison = 0;
        switch (state.sortBy) {
            case 'title':
                comparison = a.title.localeCompare(b.title);
                break;
            case 'views':
                comparison = (a.views || 0) - (b.views || 0);
                break;
            case 'date':
            default:
                comparison = new Date(a.date) - new Date(b.date);
                break;
        }
        return state.sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return published;
}

function getAdminFilteredArticles() {
    return articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (a.author && a.author.toLowerCase().includes(state.searchQuery.toLowerCase()));
        const matchesStatus = state.filterStatus === 'all' || a.status === state.filterStatus;
        return matchesSearch && matchesStatus;
    });
}

function getStats() {
    return {
        total: articles.length,
        published: articles.filter(a => a.status === 'published').length,
        drafts: articles.filter(a => a.status === 'draft').length,
        totalViews: articles.reduce((sum, a) => sum + (a.views || 0), 0)
    };
}

function getWordCount() {
    const text = state.formData.content.replace(/<[^>]*>/g, ' ');
    return text.split(/\s+/).filter(w => w).length;
}

function getCategories() {
    return ['All', ...(SITE_CONFIG?.categories || ['Design', 'Culture', 'Fiction', 'Food', 'Essays', 'Environment', 'Technology'])];
}

// =============================================
// ROUTER
// =============================================

function handleRoute() {
    const hash = window.location.hash || '#/';
    
    // Close share dropdown on navigation
    state.showShareDropdown = false;
    
    if (hash.startsWith('#/admin/' + ADMIN_SECRET_PATH)) {
        state.isAdmin = true;
        const subRoute = hash.replace('#/admin/' + ADMIN_SECRET_PATH, '');
        if (subRoute === '/articles') state.currentView = 'articles';
        else if (subRoute === '/editor') state.currentView = 'editor';
        else if (subRoute === '/analytics') state.currentView = 'analytics';
        else state.currentView = 'dashboard';
    } else if (hash.startsWith('#/admin')) {
        state.isAdmin = true;
        state.currentView = 'accessDenied';
    } else {
        state.isAdmin = false;
        trackVisit();
        if (hash === '#/articles') {
            state.currentView = 'articles';
        } else if (hash.startsWith('#/article/')) {
            const id = hash.split('/')[2];
            state.selectedArticle = articles.find(a => a.id === id);
            state.currentView = 'detail';
            if (state.selectedArticle) {
                trackVisit(id);
                // Load likes and comments for this article
                loadArticleLikes(id);
                loadArticleComments(id);
            }
        } else {
            state.currentView = 'home';
        }
    }
    
    render();
}

function navigate(path) {
    window.location.hash = path;
}

function adminNavigate(subPath) {
    window.location.hash = '#/admin/' + ADMIN_SECRET_PATH + subPath;
}

// =============================================
// EVENT HANDLERS
// =============================================

function handleLogout() {
    navigate('#/');
}

function toggleTheme() {
    state.adminTheme = state.adminTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('adminTheme', state.adminTheme);
    render();
}

function toggleMobileMenu() {
    state.showMobileMenu = !state.showMobileMenu;
    render();
}

function togglePublicTheme() {
    state.publicTheme = state.publicTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('publicTheme', state.publicTheme);
    render();
}

function filterByCategory(category) {
    state.selectedCategory = category;
    render();
}

function handleSearch(value) {
    state.searchQuery = value;
    render();
}

function handleFilterStatus(value) {
    state.filterStatus = value;
    render();
}

function viewArticle(id) {
    navigate('#/article/' + id);
}

function startNewArticle() {
    state.editingArticle = {};
    state.formData = {
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Design',
        tags: [],
        image: '',
        featured: false,
        status: 'draft'
    };
    state.currentView = 'editor';
    window.location.hash = '#/admin/' + ADMIN_SECRET_PATH + '/editor';
    render();
}

function editArticle(id) {
    const article = articles.find(a => a.id === id);
    if (article) {
        state.editingArticle = article;
        state.formData = { ...article, tags: [...(article.tags || [])] };
        state.currentView = 'editor';
        window.location.hash = '#/admin/' + ADMIN_SECRET_PATH + '/editor';
        render();
    }
}

async function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article? This cannot be undone.')) {
        try {
            await deleteArticleFromFirebase(id);
        } catch (error) {
            alert('Failed to delete article. Please try again.');
        }
    }
}

async function saveArticle(status) {
    const wordCount = getWordCount();
    const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min';
    
    const articleData = {
        ...state.formData,
        id: state.editingArticle?.id || null,
        date: state.editingArticle?.date || new Date().toISOString().split('T')[0],
        readTime: readTime,
        status: status,
        views: state.editingArticle?.views || 0
    };
    
    try {
        await saveArticleToFirebase(articleData);
        adminNavigate('/articles');
    } catch (error) {
        alert('Failed to save article. Please try again.');
    }
}

function updateFormData(field, value) {
    state.formData[field] = value;
}

function handleCoverImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            state.formData.image = e.target.result;
            render();
        };
        reader.readAsDataURL(file);
    }
}

function handleCoverImageUrl() {
    const input = document.getElementById('coverImageUrlInput');
    if (input && input.value) {
        state.formData.image = input.value;
        render();
    }
}

function removeCoverImage() {
    state.formData.image = '';
    render();
}

function addTag() {
    const input = document.getElementById('tagInput');
    if (input) {
        const tag = input.value.trim();
        if (tag && !state.formData.tags.includes(tag)) {
            state.formData.tags.push(tag);
            input.value = '';
            render();
        }
    }
}

function removeTag(tag) {
    state.formData.tags = state.formData.tags.filter(t => t !== tag);
    render();
}

// WYSIWYG Editor Functions
function execCommand(command, value) {
    document.execCommand(command, false, value || null);
    const editor = document.getElementById('wysiwygEditor');
    if (editor) editor.focus();
}

function insertHeading(level) {
    if (level) {
        execCommand('formatBlock', '<h' + level + '>');
    }
}

function insertLink() {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
}

function insertInlineImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                execCommand('insertImage', ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function insertImageFromUrl() {
    const url = prompt('Enter image URL:');
    if (url) execCommand('insertImage', url);
}

function updateEditorContent() {
    const editor = document.getElementById('wysiwygEditor');
    if (editor) state.formData.content = editor.innerHTML;
}

function togglePreview() {
    updateEditorContent();
    state.showPreview = !state.showPreview;
    render();
}

// =============================================
// RENDER FUNCTIONS - PUBLIC SITE
// =============================================

function renderPublicHeader() {
    const siteName = SITE_CONFIG?.siteName || 'Ink & Paper';
    const themeIcon = state.publicTheme === 'light' ? icons.moon : icons.sun;
    return '<header class="header"><div class="header-inner"><div class="logo" onclick="navigate(\'#/\')"><img src="logo.png" alt="' + siteName + '" class="logo-image"></div><nav class="nav"><span class="nav-link ' + (state.currentView === 'home' ? 'active' : '') + '" onclick="navigate(\'#/\')">Home</span><span class="nav-link ' + (state.currentView === 'articles' ? 'active' : '') + '" onclick="navigate(\'#/articles\')">Articles</span><span class="nav-link" onclick="filterByCategory(\'Fiction\'); navigate(\'#/articles\')">Stories</span><span class="nav-link" onclick="filterByCategory(\'Essays\'); navigate(\'#/articles\')">Essays</span></nav><div class="header-actions"><button class="theme-toggle" onclick="togglePublicTheme()" title="Toggle theme">' + themeIcon + '</button><button class="mobile-menu-btn" onclick="toggleMobileMenu()"><div class="hamburger"></div></button></div></div>' + (state.showMobileMenu ? '<div class="mobile-menu"><span class="nav-link" onclick="navigate(\'#/\')">Home</span><span class="nav-link" onclick="navigate(\'#/articles\')">Articles</span></div>' : '') + '</header>';
}

function renderPublicFooter() {
    const siteName = SITE_CONFIG?.siteName || 'Ink & Paper';
    const tagline = SITE_CONFIG?.siteTagline || 'A digital sanctuary for thoughtful writing.';
    return '<footer class="footer"><div class="footer-inner"><div><div class="footer-brand">' + siteName.replace('&', '<span>&</span>') + '</div><p class="footer-text">' + tagline + '</p></div><div><h4 class="footer-title">Sections</h4><ul class="footer-links"><li><a href="#" onclick="filterByCategory(\'Design\'); navigate(\'#/articles\'); return false;">Design</a></li><li><a href="#" onclick="filterByCategory(\'Culture\'); navigate(\'#/articles\'); return false;">Culture</a></li><li><a href="#" onclick="filterByCategory(\'Fiction\'); navigate(\'#/articles\'); return false;">Fiction</a></li></ul></div><div><h4 class="footer-title">Connect</h4><div class="social-links"><a href="https://x.com/StoriesWor80645" target="_blank" rel="noopener" class="social-icon" title="Follow us on X"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="#" target="_blank" rel="noopener" class="social-icon" title="Follow us on Facebook"><svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a><a href="#" target="_blank" rel="noopener" class="social-icon" title="Follow us on LinkedIn"><svg viewBox="0 0 24 24" width="24" height="24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></div></div></div><div class="footer-bottom">© ' + new Date().getFullYear() + ' ' + siteName + '. All rights reserved.</div></footer>';
}

function renderHomePage() {
    const featured = getPublishedArticles().filter(a => a.featured);
    const latest = getPublishedArticles().filter(a => !a.featured).slice(0, 3);
    const heroTitle = SITE_CONFIG?.heroTitle || 'Where stories find their voice, and ideas take flight.';
    const heroSubtitle = SITE_CONFIG?.heroSubtitle || 'A curated collection of essays, fiction, and thoughtful perspectives.';
    
    let html = '<section class="hero"><h1 class="hero-title">' + heroTitle + '</h1><p class="hero-subtitle">' + heroSubtitle + '</p></section>';
    
    if (featured.length > 0) {
        html += '<section class="featured-section"><div class="section-header"><h2 class="section-title">Featured</h2><span class="section-link" onclick="navigate(\'#/articles\')">View all →</span></div><div class="featured-grid">';
        featured.forEach(function(article) {
            html += '<article class="featured-card" onclick="viewArticle(\'' + article.id + '\')"><div class="featured-image-wrapper"><img src="' + (article.image || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800') + '" alt="' + article.title + '" class="featured-image"></div><div class="featured-content"><div class="article-meta"><span class="category-tag">' + article.category + '</span><span>' + (article.readTime || '5 min') + ' read</span></div><h3 class="featured-title">' + article.title + '</h3><p class="featured-excerpt">' + article.excerpt + '</p></div></article>';
        });
        html += '</div></section>';
    }
    
    if (latest.length > 0) {
        html += '<section class="articles-section"><div class="section-header"><h2 class="section-title">Latest</h2></div><div class="articles-grid">';
        latest.forEach(function(article) {
            html += '<article class="article-card" onclick="viewArticle(\'' + article.id + '\')"><img src="' + (article.image || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800') + '" alt="' + article.title + '" class="article-image"><div class="article-meta"><span class="category-tag">' + article.category + '</span><span>' + (article.readTime || '5 min') + ' read</span></div><h3 class="article-title">' + article.title + '</h3><p class="article-excerpt">' + article.excerpt + '</p></article>';
        });
        html += '</div></section>';
    }
    
    if (articles.length === 0 && !state.loading) {
        html += '<section class="articles-section"><div class="empty-state"><p>No articles yet. Check back soon!</p></div></section>';
    }
    
    return html;
}

function renderArticlesPage() {
    const filtered = getFilteredArticles();
    const categories = getCategories();
    const allTags = getAllTags();
    const allAuthors = getAllAuthors();
    const hasActiveFilters = state.filterAuthor || state.filterDateFrom || state.filterDateTo || state.filterTags.length > 0;
    
    let html = '<section class="articles-section"><div class="filter-bar"><div class="categories">';
    categories.forEach(function(cat) {
        html += '<button class="category-btn ' + (state.selectedCategory === cat ? 'active' : '') + '" onclick="filterByCategory(\'' + cat + '\')">' + cat + '</button>';
    });
    html += '</div><div class="filter-actions"><input type="text" class="search-input" placeholder="Search articles..." value="' + state.searchQuery + '" oninput="handleSearch(this.value)"><button class="filter-toggle-btn ' + (state.showAdvancedFilters ? 'active' : '') + '" onclick="toggleAdvancedFilters()">' + icons.filter + '</button></div></div>';
    
    // Advanced filters panel
    if (state.showAdvancedFilters) {
        html += '<div class="advanced-filters"><div class="filters-grid">';
        
        // Author filter
        html += '<div class="filter-group"><label class="filter-label">' + icons.user + ' Author</label><select class="filter-select" onchange="updateFilterAuthor(this.value)"><option value="">All Authors</option>';
        allAuthors.forEach(function(author) {
            html += '<option value="' + author + '"' + (state.filterAuthor === author ? ' selected' : '') + '>' + author + '</option>';
        });
        html += '</select></div>';
        
        // Date range
        html += '<div class="filter-group"><label class="filter-label">' + icons.calendar + ' Date From</label><input type="date" class="filter-input" value="' + state.filterDateFrom + '" onchange="updateFilterDateFrom(this.value)"></div>';
        html += '<div class="filter-group"><label class="filter-label">' + icons.calendar + ' Date To</label><input type="date" class="filter-input" value="' + state.filterDateTo + '" onchange="updateFilterDateTo(this.value)"></div>';
        
        // Sort options
        html += '<div class="filter-group"><label class="filter-label">Sort By</label><select class="filter-select" onchange="updateSortBy(this.value)"><option value="date"' + (state.sortBy === 'date' ? ' selected' : '') + '>Date</option><option value="title"' + (state.sortBy === 'title' ? ' selected' : '') + '>Title</option><option value="views"' + (state.sortBy === 'views' ? ' selected' : '') + '>Views</option></select></div>';
        html += '<div class="filter-group"><label class="filter-label">Order</label><select class="filter-select" onchange="updateSortOrder(this.value)"><option value="desc"' + (state.sortOrder === 'desc' ? ' selected' : '') + '>Newest First</option><option value="asc"' + (state.sortOrder === 'asc' ? ' selected' : '') + '>Oldest First</option></select></div>';
        
        html += '</div>';
        
        // Tags filter
        if (allTags.length > 0) {
            html += '<div class="filter-tags-section"><label class="filter-label">Filter by Tags</label><div class="filter-tags">';
            allTags.forEach(function(tag) {
                const isActive = state.filterTags.includes(tag);
                html += '<button class="filter-tag-btn ' + (isActive ? 'active' : '') + '" onclick="toggleFilterTag(\'' + tag + '\')">#' + tag + '</button>';
            });
            html += '</div></div>';
        }
        
        // Clear filters button
        if (hasActiveFilters) {
            html += '<button class="clear-filters-btn" onclick="clearAllFilters()">Clear All Filters</button>';
        }
        
        html += '</div>';
    }
    
    // Results count
    html += '<div class="results-info"><span>' + filtered.length + ' article' + (filtered.length !== 1 ? 's' : '') + ' found</span></div>';
    
    html += '<div class="articles-grid">';
    
    if (filtered.length > 0) {
        filtered.forEach(function(article) {
            let tagsHtml = '';
            if (article.tags && article.tags.length) {
                article.tags.forEach(function(tag) {
                    tagsHtml += '<span class="tag">#' + tag + '</span>';
                });
            }
            html += '<article class="article-card" onclick="viewArticle(\'' + article.id + '\')"><img src="' + (article.image || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800') + '" alt="' + article.title + '" class="article-image"><div class="article-meta"><span class="category-tag">' + article.category + '</span><span>' + (article.readTime || '5 min') + ' read</span><span>' + formatDate(article.date) + '</span></div><h3 class="article-title">' + article.title + '</h3><p class="article-excerpt">' + article.excerpt + '</p><div class="tags-list">' + tagsHtml + '</div></article>';
        });
    } else {
        html += '<p class="no-results">No articles found matching your criteria.</p>';
    }
    
    html += '</div></section>';
    return html;
}

function renderArticleDetail() {
    const article = state.selectedArticle;
    if (!article) {
        return '<section class="article-detail"><span class="back-link" onclick="navigate(\'#/articles\')">← Back to articles</span><div class="empty-state"><p>Article not found. It may have been removed.</p></div></section>';
    }
    
    let tagsHtml = '';
    if (article.tags && article.tags.length) {
        article.tags.forEach(function(tag) {
            tagsHtml += '<span class="tag">#' + tag + '</span>';
        });
    }
    
    // Likes
    const likeCount = state.articleLikes[article.id] || 0;
    const hasLiked = state.userLikes[article.id];
    const likeIcon = hasLiked ? icons.heartFilled : icons.heart;
    const likeClass = hasLiked ? 'liked' : '';
    
    // Comments
    const comments = state.articleComments[article.id] || [];
    let commentsHtml = '<div class="comments-section"><h3 class="comments-title">' + icons.comment + ' Comments (' + comments.length + ')</h3>';
    
    // Comment form
    commentsHtml += '<div class="comment-form"><input type="text" class="comment-input" placeholder="Your name" value="' + (state.newComment.name || '') + '" oninput="updateCommentField(\'name\', this.value)"><textarea class="comment-textarea" placeholder="Write a comment..." oninput="updateCommentField(\'text\', this.value)">' + (state.newComment.text || '') + '</textarea><button class="btn-comment" onclick="submitComment(\'' + article.id + '\')">' + icons.send + ' Post Comment</button></div>';
    
    // Comments list
    if (comments.length > 0) {
        commentsHtml += '<div class="comments-list">';
        comments.forEach(function(comment) {
            const commentDate = new Date(comment.timestamp).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            commentsHtml += '<div class="comment-item"><div class="comment-header"><span class="comment-author">' + icons.user + ' ' + comment.name + '</span><span class="comment-date">' + commentDate + '</span></div><p class="comment-text">' + comment.text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>') + '</p></div>';
        });
        commentsHtml += '</div>';
    } else {
        commentsHtml += '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';
    }
    commentsHtml += '</div>';
    
    // Share dropdown
    let shareDropdownHtml = '';
    if (state.showShareDropdown) {
        shareDropdownHtml = '<div class="share-dropdown"><div class="share-option" onclick="shareOnFacebook(state.selectedArticle)">' + icons.facebook + ' Facebook</div><div class="share-option" onclick="shareOnTwitter(state.selectedArticle)">' + icons.twitter + ' X</div><div class="share-option" onclick="shareOnWhatsApp(state.selectedArticle)">' + icons.whatsapp + ' WhatsApp</div><div class="share-option" onclick="copyArticleLink()">' + icons.copyLink + ' Copy Link</div></div>';
    }
    
    return '<article class="article-detail"><span class="back-link" onclick="navigate(\'#/articles\')">← Back to articles</span><header class="article-header"><div class="article-meta" style="margin-bottom: 1rem;"><span class="category-tag">' + article.category + '</span><span>' + (article.readTime || '5 min') + ' read</span></div><h1 class="article-detail-title">' + article.title + '</h1><div class="article-detail-meta"><span>By <span class="author-name">' + (article.author || 'Unknown') + '</span></span><span>' + formatDate(article.date) + '</span></div></header>' + (article.image ? '<img src="' + article.image + '" alt="' + article.title + '" class="article-detail-image">' : '') + '<div class="article-body">' + article.content + '</div><div class="article-engagement"><div class="engagement-left"><button class="like-btn ' + likeClass + '" onclick="toggleLike(\'' + article.id + '\')">' + likeIcon + '<span class="like-count">' + likeCount + '</span></button></div><div class="engagement-right"><div class="share-container"><button class="share-btn" onclick="toggleShareDropdown()">' + icons.share + '</button>' + shareDropdownHtml + '</div></div></div><div class="article-tags"><div class="article-tags-title">Tagged</div><div class="tags-list">' + tagsHtml + '</div></div>' + commentsHtml + '</article>';
}

// =============================================
// RENDER FUNCTIONS - ADMIN SITE
// =============================================

function renderAccessDenied() {
    return '<div class="login-container"><div class="login-card"><div class="login-icon">' + icons.warning + '</div><h1 class="login-title">Access Denied</h1><p class="login-subtitle">Invalid admin URL. Check your link.</p><br><button class="btn-primary" onclick="navigate(\'#/\')">← Back to Site</button></div></div>';
}

function renderAdminSidebar() {
    const siteName = SITE_CONFIG?.siteName || 'Ink & Paper';
    return '<aside class="sidebar"><div class="sidebar-header"><div class="sidebar-logo">' + siteName.replace('&', '<span>&</span>') + '<span class="sidebar-badge">ADMIN</span></div></div><nav class="sidebar-nav"><div class="admin-nav-item ' + (state.currentView === 'dashboard' ? 'active' : '') + '" onclick="adminNavigate(\'/dashboard\')">' + icons.dashboard + ' Dashboard</div><div class="admin-nav-item ' + (state.currentView === 'analytics' ? 'active' : '') + '" onclick="adminNavigate(\'/analytics\')">' + icons.analytics + ' Analytics</div><div class="admin-nav-item ' + (state.currentView === 'articles' || state.currentView === 'editor' ? 'active' : '') + '" onclick="adminNavigate(\'/articles\')">' + icons.articles + ' Articles</div><div class="admin-nav-item" onclick="navigate(\'#/\')">' + icons.home + ' View Site</div></nav><div class="sidebar-footer"><div class="theme-toggle" onclick="toggleTheme()">' + (state.adminTheme === 'dark' ? icons.sun : icons.moon) + '<span>' + (state.adminTheme === 'dark' ? 'Light' : 'Dark') + '</span><div class="toggle-switch ' + (state.adminTheme === 'light' ? 'active' : '') + '"></div></div><div class="admin-nav-item" onclick="handleLogout()">' + icons.logout + ' Exit Admin</div></div></aside>';
}

function renderDashboard() {
    const stats = getStats();
    
    let html = '<div class="page-header"><h1 class="page-title">Dashboard</h1><button class="btn-primary" onclick="startNewArticle()">' + icons.plus + ' New Article</button></div>';
    
    if (state.error) {
        html += '<div class="error-banner">' + state.error + '</div>';
    }
    
    html += '<div class="stats-grid"><div class="stat-card"><div class="stat-value">' + stats.total + '</div><div class="stat-label">Total Articles</div></div><div class="stat-card success"><div class="stat-value">' + stats.published + '</div><div class="stat-label">Published</div></div><div class="stat-card warning"><div class="stat-value">' + stats.drafts + '</div><div class="stat-label">Drafts</div></div><div class="stat-card accent"><div class="stat-value">' + stats.totalViews.toLocaleString() + '</div><div class="stat-label">Total Views</div></div></div>';
    
    html += '<div class="articles-table"><div class="table-wrapper"><table><thead><tr><th>Title</th><th>Status</th><th>Views</th><th>Date</th><th>Actions</th></tr></thead><tbody>';
    
    if (articles.length > 0) {
        articles.slice(0, 5).forEach(function(article) {
            html += '<tr><td class="article-title-cell"><span>' + article.title + '</span></td><td><span class="status-badge status-' + article.status + '">' + article.status + '</span></td><td style="color: var(--admin-text-muted)">' + (article.views || 0).toLocaleString() + '</td><td style="color: var(--admin-text-muted)">' + formatDate(article.date) + '</td><td><div class="table-actions"><button class="icon-btn" onclick="editArticle(\'' + article.id + '\')">' + icons.edit + '</button></div></td></tr>';
        });
    } else {
        html += '<tr><td colspan="5" style="text-align: center; color: var(--admin-text-muted);">No articles yet. Create your first one!</td></tr>';
    }
    
    html += '</tbody></table></div></div>';
    return html;
}

function renderAnalytics() {
    const stats = getStats();
    const topArticles = articles.slice().sort(function(a, b) { return (b.views || 0) - (a.views || 0); }).slice(0, 5);
    
    let dailyVisitsArray = [];
    if (analytics.dailyVisits) {
        Object.keys(analytics.dailyVisits).forEach(function(date) {
            dailyVisitsArray.push({ date: date, visits: analytics.dailyVisits[date] });
        });
        dailyVisitsArray.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });
        dailyVisitsArray = dailyVisitsArray.slice(-7);
    }
    
    let maxVisits = 1;
    dailyVisitsArray.forEach(function(d) { if (d.visits > maxVisits) maxVisits = d.visits; });
    
    let html = '<div class="page-header"><h1 class="page-title">Analytics</h1></div>';
    
    html += '<div class="stats-grid"><div class="stat-card"><div class="stat-value">' + (analytics.totalVisits || 0).toLocaleString() + '</div><div class="stat-label">' + icons.eye + ' Total Page Views</div></div><div class="stat-card accent"><div class="stat-value">' + stats.totalViews.toLocaleString() + '</div><div class="stat-label">' + icons.articles + ' Article Views</div></div><div class="stat-card success"><div class="stat-value">' + stats.published + '</div><div class="stat-label">Published Articles</div></div><div class="stat-card warning"><div class="stat-value">' + (dailyVisitsArray.length > 0 ? dailyVisitsArray[dailyVisitsArray.length - 1].visits : 0) + '</div><div class="stat-label">Today\'s Visits</div></div></div>';
    
    html += '<div class="analytics-grid"><div class="analytics-card"><div class="analytics-card-title">Visits (Last 7 Days)</div><div class="bar-chart">';
    
    if (dailyVisitsArray.length > 0) {
        dailyVisitsArray.forEach(function(day) {
            const height = (day.visits / maxVisits) * 180;
            const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
            html += '<div class="bar-wrapper"><div class="bar" style="height: ' + height + 'px" title="' + day.visits + ' visits"></div><div class="bar-label">' + dayName + '</div></div>';
        });
    } else {
        html += '<p style="color: var(--admin-text-muted); text-align: center; width: 100%;">No data yet</p>';
    }
    
    html += '</div></div><div class="analytics-card"><div class="analytics-card-title">Top Articles</div><div class="top-articles-list">';
    
    if (topArticles.length > 0) {
        topArticles.forEach(function(article) {
            html += '<div class="top-article-item"><span class="top-article-title">' + article.title + '</span><span class="top-article-views">' + (article.views || 0).toLocaleString() + ' views</span></div>';
        });
    } else {
        html += '<p style="color: var(--admin-text-muted); text-align: center;">No articles yet</p>';
    }
    
    html += '</div></div></div>';
    return html;
}

function renderArticlesList() {
    const filtered = getAdminFilteredArticles();
    
    let html = '<div class="page-header"><h1 class="page-title">All Articles</h1><button class="btn-primary" onclick="startNewArticle()">' + icons.plus + ' New Article</button></div>';
    
    html += '<div class="admin-filter-bar"><input type="text" class="admin-search-input" placeholder="Search articles..." value="' + state.searchQuery + '" oninput="handleSearch(this.value)"><select class="filter-select" onchange="handleFilterStatus(this.value)"><option value="all"' + (state.filterStatus === 'all' ? ' selected' : '') + '>All Status</option><option value="published"' + (state.filterStatus === 'published' ? ' selected' : '') + '>Published</option><option value="draft"' + (state.filterStatus === 'draft' ? ' selected' : '') + '>Drafts</option></select></div>';
    
    html += '<div class="articles-table"><div class="table-wrapper"><table><thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Status</th><th>Views</th><th>Actions</th></tr></thead><tbody>';
    
    if (filtered.length > 0) {
        filtered.forEach(function(article) {
            html += '<tr><td class="article-title-cell"><span>' + article.title + '</span></td><td style="color: var(--admin-text-muted)">' + (article.author || '-') + '</td><td style="color: var(--admin-text-muted)">' + article.category + '</td><td><span class="status-badge status-' + article.status + '">' + article.status + '</span></td><td style="color: var(--admin-text-muted)">' + (article.views || 0).toLocaleString() + '</td><td><div class="table-actions"><button class="icon-btn" onclick="editArticle(\'' + article.id + '\')">' + icons.edit + '</button><button class="icon-btn danger" onclick="deleteArticle(\'' + article.id + '\')">' + icons.trash + '</button></div></td></tr>';
        });
    } else {
        html += '<tr><td colspan="6" style="text-align: center; color: var(--admin-text-muted);">No articles found</td></tr>';
    }
    
    html += '</tbody></table></div></div>';
    return html;
}

function renderEditor() {
    const wordCount = getWordCount();
    const categories = getCategories().filter(function(c) { return c !== 'All'; });
    
    let html = '<div class="page-header"><h1 class="page-title">' + (state.editingArticle && state.editingArticle.id ? 'Edit Article' : 'New Article') + '</h1><div class="page-header-actions"><button class="btn-secondary" onclick="togglePreview()">' + icons.eye + ' Preview</button><button class="btn-secondary" onclick="adminNavigate(\'/articles\')">Cancel</button></div></div>';
    
    html += '<div class="editor-container"><div class="editor-main">';
    
    // Title input
    html += '<input type="text" class="title-input" placeholder="Article title..." value="' + (state.formData.title || '') + '" oninput="updateFormData(\'title\', this.value)">';
    
    // Excerpt input
    html += '<textarea class="excerpt-input" placeholder="Brief excerpt..." oninput="updateFormData(\'excerpt\', this.value)">' + (state.formData.excerpt || '') + '</textarea>';
    
    // WYSIWYG Toolbar and Editor
    html += '<div><div class="wysiwyg-toolbar">';
    html += '<button class="toolbar-btn" onclick="execCommand(\'bold\')" title="Bold">' + icons.bold + '</button>';
    html += '<button class="toolbar-btn" onclick="execCommand(\'italic\')" title="Italic">' + icons.italic + '</button>';
    html += '<button class="toolbar-btn" onclick="execCommand(\'underline\')" title="Underline">' + icons.underline + '</button>';
    html += '<div class="toolbar-divider"></div>';
    html += '<select class="toolbar-select" onchange="insertHeading(this.value); this.value=\'\'"><option value="">Heading</option><option value="1">H1</option><option value="2">H2</option><option value="3">H3</option></select>';
    html += '<div class="toolbar-divider"></div>';
    html += '<button class="toolbar-btn" onclick="execCommand(\'insertUnorderedList\')" title="Bullet List">' + icons.list + '</button>';
    html += '<button class="toolbar-btn" onclick="execCommand(\'insertOrderedList\')" title="Numbered List">' + icons.orderedList + '</button>';
    html += '<button class="toolbar-btn" onclick="execCommand(\'formatBlock\', \'<blockquote>\')" title="Quote">' + icons.quote + '</button>';
    html += '<div class="toolbar-divider"></div>';
    html += '<button class="toolbar-btn" onclick="execCommand(\'justifyLeft\')">' + icons.alignLeft + '</button>';
    html += '<button class="toolbar-btn" onclick="execCommand(\'justifyCenter\')">' + icons.alignCenter + '</button>';
    html += '<div class="toolbar-divider"></div>';
    html += '<button class="toolbar-btn" onclick="insertLink()" title="Link">' + icons.link + '</button>';
    html += '<button class="toolbar-btn" onclick="insertInlineImage()" title="Insert Image" style="background: var(--admin-accent-soft); color: var(--admin-accent);">' + icons.image + ' Image</button>';
    html += '<button class="toolbar-btn" onclick="insertImageFromUrl()" title="Image URL">URL</button>';
    html += '</div>';
    html += '<div id="wysiwygEditor" class="wysiwyg-editor" contenteditable="true" oninput="updateEditorContent()">' + (state.formData.content || '') + '</div></div>';
    
    // Editor footer
    html += '<div class="editor-footer"><div class="word-count">' + wordCount + ' words · ~' + Math.max(1, Math.ceil(wordCount / 200)) + ' min read</div></div>';
    
    html += '</div>'; // End editor-main
    
    // Sidebar
    html += '<div class="editor-sidebar">';
    
    // Cover Image
    html += '<div class="editor-card"><div class="editor-card-title">Cover Image</div>';
    if (state.formData.image) {
        html += '<div class="image-preview"><img src="' + state.formData.image + '" alt="Cover"><div class="image-actions"><button class="btn-secondary btn-sm btn-danger" onclick="removeCoverImage()">' + icons.trash + ' Remove</button></div></div>';
    } else {
        html += '<label class="image-upload-area"><input type="file" accept="image/*" onchange="handleCoverImageUpload(event)"><div class="upload-icon">' + icons.upload + '</div><div class="upload-text"><span>Upload cover</span></div></label>';
    }
    html += '<div style="margin-top: 1rem;"><input type="text" id="coverImageUrlInput" class="form-input" placeholder="Or paste URL..." style="font-size: 0.9rem;" onblur="handleCoverImageUrl()"></div></div>';
    
    // Details
    html += '<div class="editor-card"><div class="editor-card-title">Details</div>';
    html += '<div class="form-row"><label class="form-label">Author</label><input type="text" class="form-input" value="' + (state.formData.author || '') + '" placeholder="Author name" oninput="updateFormData(\'author\', this.value)"></div>';
    html += '<div class="form-row"><label class="form-label">Category</label><select class="form-select" onchange="updateFormData(\'category\', this.value)">';
    categories.forEach(function(cat) {
        html += '<option value="' + cat + '"' + (state.formData.category === cat ? ' selected' : '') + '>' + cat + '</option>';
    });
    html += '</select></div>';
    html += '<div class="form-row"><label class="checkbox-row"><input type="checkbox"' + (state.formData.featured ? ' checked' : '') + ' onchange="updateFormData(\'featured\', this.checked)"><span class="checkbox-label">Featured article</span></label></div></div>';
    
    // Tags
    html += '<div class="editor-card"><div class="editor-card-title">Tags</div><div class="tags-container">';
    if (state.formData.tags && state.formData.tags.length) {
        state.formData.tags.forEach(function(tag) {
            html += '<span class="admin-tag">' + tag + '<button onclick="removeTag(\'' + tag + '\')">' + icons.x + '</button></span>';
        });
    }
    html += '</div><div class="tag-input-row"><input type="text" id="tagInput" class="tag-input" placeholder="Add tag..." onkeypress="if(event.key===\'Enter\'){event.preventDefault();addTag();}"><button class="btn-secondary btn-sm" onclick="addTag()">Add</button></div></div>';
    
    // Actions
    html += '<div class="editor-actions"><button class="btn-secondary" onclick="updateEditorContent(); saveArticle(\'draft\')">Save as Draft</button><button class="btn-primary" onclick="updateEditorContent(); saveArticle(\'published\')">Publish Now</button></div>';
    
    html += '</div>'; // End editor-sidebar
    html += '</div>'; // End editor-container
    
    // Preview modal
    if (state.showPreview) {
        html += renderPreviewModal();
    }
    
    return html;
}

function renderPreviewModal() {
    return '<div class="preview-overlay"><div class="preview-header"><span style="color: var(--admin-text-muted)">Preview Mode</span><button class="btn-secondary" onclick="togglePreview()">' + icons.x + ' Close</button></div><div class="preview-content"><h1 class="preview-title">' + (state.formData.title || 'Untitled') + '</h1><div class="preview-meta">By ' + (state.formData.author || 'Unknown') + ' · ' + state.formData.category + '</div>' + (state.formData.image ? '<img src="' + state.formData.image + '" class="preview-image">' : '') + '<div class="preview-body">' + state.formData.content + '</div></div></div>';
}

// =============================================
// MAIN RENDER
// =============================================

function render() {
    const app = document.getElementById('app');
    
    if (state.loading) {
        app.innerHTML = '<div class="loading-screen"><div class="loading-spinner"></div><p>Loading...</p></div>';
        return;
    }
    
    if (state.isAdmin) {
        if (state.currentView === 'accessDenied') {
            app.className = 'admin-site admin-' + state.adminTheme;
            app.innerHTML = renderAccessDenied();
        } else {
            app.className = 'admin-site admin-' + state.adminTheme;
            let content = '';
            switch (state.currentView) {
                case 'analytics': content = renderAnalytics(); break;
                case 'articles': content = renderArticlesList(); break;
                case 'editor': content = renderEditor(); break;
                default: content = renderDashboard();
            }
            app.innerHTML = '<div class="admin-app-container">' + renderAdminSidebar() + '<main class="admin-main-content">' + content + '</main></div>';
        }
    } else {
        app.className = 'public-site public-' + state.publicTheme;
        let content = '';
        switch (state.currentView) {
            case 'articles': content = renderArticlesPage(); break;
            case 'detail': content = renderArticleDetail(); break;
            default: content = renderHomePage();
        }
        app.innerHTML = renderPublicHeader() + '<main>' + content + '</main>' + renderPublicFooter();
    }
}

// =============================================
// INITIALIZE APP
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if Firebase config is set
    if (!firebaseConfig || firebaseConfig.apiKey === 'PASTE_YOUR_API_KEY_HERE') {
        state.loading = false;
        state.error = 'Firebase not configured. Please edit config.js with your Firebase credentials.';
        render();
        return;
    }
    
    // Initialize Firebase
    var initialized = initFirebase();
    if (!initialized) {
        state.loading = false;
        state.error = 'Failed to initialize Firebase. Check your configuration.';
        render();
        return;
    }
    
    // Load data
    loadArticles();
    loadAnalytics();
    
    // Setup routing
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
});
