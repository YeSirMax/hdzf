
    var canvas,
        ctx,
        width,
        height,
        size,
        lines = [],
        tick;

    function line() {
        this.path = [];
        this.speed = rand(10, 20);
        this.count = randInt(10, 30);
        this.x = width / 2 +1;
        this.y = height / 2 + 1;
        this.target = {
            x: width / 2,
            y: height / 2
        };
        this.dist = 0;
        this.angle = 0;
        this.hue = tick / 100;
        this.life = 1;
        this.updateAngle();
        this.updateDist();
    }

    line.prototype.step = function(i) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.updateDist();
        if (this.dist < this.speed) {
            this.x = this.target.x;
            this.y = this.target.y;
            this.changeTarget();
        }

        this.path.push({
            x: this.x,
            y: this.y
        });
        if (this.path.length > this.count) {
            this.path.shift();
        }

        this.life -= 0.001;

        if (this.life <= 0) {
            this.path = null;
            lines.splice(i, 1);
        }
    };

    line.prototype.updateDist = function() {
        var dx = this.target.x - this.x,
            dy = this.target.y - this.y;
        this.dist = Math.sqrt(dx * dx + dy * dy);
    }

    line.prototype.updateAngle = function() {
        var dx = this.target.x - this.x,
            dy = this.target.y - this.y;
        this.angle = Math.atan2(dy, dx);
    }

    line.prototype.changeTarget = function() {
        var randStart = randInt(0, 3);
        switch (randStart) {
            case 0: // up
                this.target.y = this.y - size;
                break;
            case 1: // right
                this.target.x = this.x + size;
                break;
            case 2: // down
                this.target.y = this.y + size;
                break;
            case 3: // left
                this.target.x = this.x - size;
        }
        this.updateAngle();
    };

    line.prototype.draw = function(i) {
        ctx.beginPath();
        var rando = rand(0, 1);
        for (var j = 0, length = this.path.length; j < length; j++) {
            ctx[(j === 0) ? 'moveTo' : 'lineTo'](this.path[j].x + rand(-rando, rando), this.path[j].y + rand(-rando, rando));
        }
        ctx.strokeStyle = 'hsla(' + rand(this.hue, this.hue + 30) + ', 80%, 55%, ' + (this.life / 3) + ')';
        ctx.lineWidth = rand(0.1, 2);
        ctx.stroke();
    };

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randInt(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    };

    function canvasInit() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        size = 50;
        lines = [];
        reset();
        xunhuan();
    }

    function reset() {
        width = Math.ceil(window.innerWidth / 2) * 2;
        height = Math.ceil(window.innerHeight / 2) * 2;
        tick = 0;

        lines.length = 0;
        canvas.width = width;
        canvas.height = height;
    }

    function create() {
        if (tick % 40 === 0) {
            var lineList = new line();
            lines.push(lineList);
        }
    }

    function step(i) {
        var i = lines.length;
        while (i--) {
            lines[i].step(i);
        }
    }

    function clear() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1)';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'lighter';
    }

    function draw() {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.translate(-width / 2, -height / 2);
        var i = lines.length;
        while (i--) {
            lines[i].draw(i/0.1);
        }
        ctx.restore();
    }
    var canvasLoop = null;

    function xunhuan() {
        if(requestAnimationFrame !== null){
            canvasLoop = requestAnimationFrame(xunhuan);
        }
        create();
        step();
        clear();
        draw();
        tick++;
    }

    function onresize() {
        reset();
    }
    window.addEventListener('resize', onresize);

    function onOffCanvas(index) {
        if( index !==0){
            window.cancelAnimationFrame(canvasLoop);
        }
        if( index == 0){
            window.requestAnimationFrame(xunhuan);
        }
    }
