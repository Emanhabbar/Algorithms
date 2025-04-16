// تعريف المصفوفة التي سيتم ترتيبها
let array = [];

// توليد قيم المصفوفة من المدخلات اليدوية
// توليد قيم المصفوفة من المدخلات اليدوية
const generateArray = () => {
    const input = document.getElementById('arrayInput').value;
    const values = input.split(',').map(val => parseInt(val.trim())).filter(val => !isNaN(val));
    
    if (values.length === 0) {
        alert("الرجاء إدخال قيم صحيحة.");
        return;
    }

    array = values;
    console.log(array);  // تحقق من القيم المدخلة
    renderArray();  // تأكد من أن هذه الدالة تُنفذ بشكل صحيح
};
const renderArray = () => {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = ''; // مسح الأعمدة السابقة

    console.log(array); // تأكد من أن المصفوفة تحتوي على القيم

    array.forEach((value, index) => {
        const barContainer = document.createElement('div'); // حاوية لكل عمود
        barContainer.classList.add('bar-container');
        barContainer.setAttribute('data-index', index); // إضافة فهرس لكل عمود

        // إنشاء العمود
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`; // تكبير القيمة لملاءمة الأعمدة

        // إنشاء النص أسفل العمود
        const valueLabel = document.createElement('span');
        valueLabel.textContent = value;
        valueLabel.classList.add('value-label');

        // إضافة العمود والنص إلى الحاوية
        barContainer.appendChild(bar);
        barContainer.appendChild(valueLabel);

        container.appendChild(barContainer);
    });
};



// توليد المصفوفة عند الضغط على زر "إنشاء الأعمدة"
document.getElementById('generateArrayBtn').addEventListener('click', generateArray);
const swapBars = (i, j) => {
    const container = document.getElementById('arrayContainer');
    const bars = container.getElementsByClassName('bar-container');
    
    // تلوين الأعمدة أثناء المقارنة
    const bar1 = bars[i].querySelector('.bar');
    const bar2 = bars[j].querySelector('.bar');
    const label1 = bars[i].querySelector('.value-label');
    const label2 = bars[j].querySelector('.value-label');

    bar1.style.backgroundColor = 'red';
    bar2.style.backgroundColor = 'red';

    // التأخير بين التلوين ثم التبديل
    setTimeout(() => {
        // التبديل في الأعمدة
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;

        // التبديل في النصوص
        const tempText = label1.textContent;
        label1.textContent = label2.textContent;
        label2.textContent = tempText;

        // إعادة اللون إلى الوضع الطبيعي بعد التبديل
        bar1.style.backgroundColor = '';
        bar2.style.backgroundColor = '';
    }, 300); // التأخير قبل التبديل (تزيد من سرعة العرض)
};
const bubbleSort = async () => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            // تلوين الأعمدة أثناء المقارنة
            const bars = document.getElementsByClassName('bar-container');
            const bar1 = bars[j].querySelector('.bar');
            const bar2 = bars[j + 1].querySelector('.bar');
            
            // تلوين الأعمدة باللون الأحمر
            bar1.style.backgroundColor = 'red';
            bar2.style.backgroundColor = 'red';
            
            // التأخير قبل التبديل
            await new Promise(resolve => setTimeout(resolve, 500)); // مدة أكبر لتوضيح المقارنة

            if (array[j] > array[j + 1]) {
                // التبديل في المصفوفة
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // التبديل في الأعمدة والنصوص
                swapBars(j, j + 1);
            }

            // إعادة الأعمدة إلى اللون الطبيعي
            bar1.style.backgroundColor = '';
            bar2.style.backgroundColor = '';

            // الانتظار قبل الانتقال للمقارنة التالية
            await new Promise(resolve => setTimeout(resolve, 500)); // مدة أكبر لجعل المقارنة أكثر وضوحًا
        }
    }
};

const selectionSort = async () => {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            // تلوين الأعمدة أثناء المقارنة
            const bars = document.getElementsByClassName('bar-container');
            const bar1 = bars[minIndex].querySelector('.bar');
            const bar2 = bars[j].querySelector('.bar');
            
            // تلوين الأعمدة باللون الأحمر أثناء المقارنة
            bar1.style.backgroundColor = 'red';
            bar2.style.backgroundColor = 'red';
            
            await new Promise(resolve => setTimeout(resolve, 500)); // التأخير لزيادة وضوح المقارنة
            
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            // إعادة الأعمدة إلى اللون الطبيعي بعد المقارنة
            bar1.style.backgroundColor = '';
            bar2.style.backgroundColor = '';
        }

        // التبديل بين العناصر إذا لزم الأمر
        if (minIndex !== i) {
            // التبديل في المصفوفة
            [array[i], array[minIndex]] = [array[minIndex], array[i]];

            // التبديل في الأعمدة والنصوص
            swapBars(i, minIndex);
        }

        // إضافة تأخير قبل الانتقال للمقارنة التالية
        await new Promise(resolve => setTimeout(resolve, 500));
    }
};


// خوارزمية الإدراج
const insertionSort = async () => {
    for (let i = 1; i < array.length; i++) {
        let j = i;

        while (j > 0 && array[j] < array[j - 1]) {
            // تلوين الأعمدة أثناء المقارنة
            const bars = document.getElementsByClassName('bar-container');
            const bar1 = bars[j].querySelector('.bar');
            const bar2 = bars[j - 1].querySelector('.bar');
            
            // تلوين الأعمدة باللون الأحمر أثناء المقارنة
            bar1.style.backgroundColor = 'red';
            bar2.style.backgroundColor = 'red';
            
            await new Promise(resolve => setTimeout(resolve, 500)); // التأخير لزيادة وضوح المقارنة

            // التبديل بين الأعمدة
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            swapBars(j, j - 1);

            // إعادة الأعمدة إلى اللون الطبيعي بعد التبديل
            bar1.style.backgroundColor = '';
            bar2.style.backgroundColor = '';

            j--;
        }

        // إضافة تأخير قبل الانتقال للمقارنة التالية
        await new Promise(resolve => setTimeout(resolve, 500));
    }
};
const mergeSort = async () => {
    const mergeSortHelper = async (arr, left, right) => {
        if (left >= right) return;

        let mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid);    // تقسيم الجزء الأيسر
        await mergeSortHelper(arr, mid + 1, right); // تقسيم الجزء الأيمن
        await mergeArrays(arr, left, mid, right);  // دمج الأجزاء مع التحديث
    };

    const mergeArrays = async (arr, left, mid, right) => {
        let temp = [];
        let i = left, j = mid + 1;

        const bars = document.getElementsByClassName('bar-container');

        // مقارنة ودمج القيم في مصفوفة مؤقتة
        while (i <= mid && j <= right) {
            const bar1 = bars[i].querySelector('.bar');
            const bar2 = bars[j].querySelector('.bar');

            // تلوين الأعمدة أثناء المقارنة
            bar1.style.backgroundColor = 'red';
            bar2.style.backgroundColor = 'red';

            await new Promise(resolve => setTimeout(resolve, 500));

            if (arr[i] <= arr[j]) {
                temp.push(arr[i++]);
            } else {
                temp.push(arr[j++]);
            }

            // إعادة اللون الطبيعي
            bar1.style.backgroundColor = '';
            bar2.style.backgroundColor = '';
        }

        // إضافة باقي العناصر
        while (i <= mid) temp.push(arr[i++]);
        while (j <= right) temp.push(arr[j++]);

        // تحديث المصفوفة الأصلية وعرض الأعمدة بصريًا
        for (let k = left; k <= right; k++) {
            arr[k] = temp[k - left];

            // تحديث الأعمدة
            const bar = bars[k].querySelector('.bar');
            bar.style.height = `${arr[k] * 3}px`;  // تحديث الارتفاع

            const valueLabel = bars[k].querySelector('.value-label');
            valueLabel.textContent = arr[k]; // تحديث النص

            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // إعادة اللون الطبيعي بعد الدمج
        for (let k = left; k <= right; k++) {
            bars[k].querySelector('.bar').style.backgroundColor = '';
        }
    };

    await mergeSortHelper(array, 0, array.length - 1);
};

// ربط الخوارزمية بزر التشغيل
document.getElementById('mergeSortBtn').addEventListener('click', mergeSort);


// تشغيل الخوارزميات بناءً على الاختيار
document.getElementById('startBtn').addEventListener('click', async () => {
    const selectedAlgorithm = document.querySelector('.navbar ul li a.selected');
    if (!selectedAlgorithm) {
        alert("الرجاء اختيار خوارزمية أولاً");
        return;
    }

    switch (selectedAlgorithm.id) {
        case 'bubbleSortBtn':
            await bubbleSort();
            break;
        case 'selectionSortBtn':
            await selectionSort();
            break;
        case 'insertionSortBtn':
            await insertionSort();
            break;
        case 'mergeSortBtn':
            await mergeSort();
            break;
    }
});

// إضافة وظيفة لاختيار الخوارزمية
const addAlgorithmSelection = () => {
    const links = document.querySelectorAll('.navbar ul li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(link => link.classList.remove('selected'));
            link.classList.add('selected');
        });
    });
};

addAlgorithmSelection();
